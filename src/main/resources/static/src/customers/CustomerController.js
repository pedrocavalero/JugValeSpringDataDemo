(function(){
  'use strict';
  
  angular
       .module('customers')
       .controller('CustomerController', [
           'customerService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', '$scope', '$mdDialog',
          CustomerController
       ]);

  /**
   * Main Controller
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
   function CustomerController( customerService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog) {
    var self = this;

    self.customers            = [];
    self.newCustomerName  = "";

    //Initial position for MAP
    self.map = {
      center: {
        latitude: -23.2206729,
        longitude: -45.8865205
      },
      zoom: 15,
      bounds : {}
    };

    //Selector
    self.marker = {
	    id: 0,
	    coords: {
	      latitude: -23.2206729,
	      longitude: -45.8865205
	    },
	    options: {draggable: true,icon: {
	        path: google.maps.SymbolPath.CIRCLE,
	        scale: 0
	    }, labelClass: 'label' },
	    events: {
	      dragend: function (marker, eventName, args) {
	          console.log(self.marker.coords);
	      },
	      click : function(marker, eventName, args)
	      {
	          if (marker.model.id == undefined) return;
	          
	          materialAlert('Pino', "Eu sou: " + marker.model.name);
	          
	          console.log(marker.model);
	      }
	    }
    };

    // Load all registered customers
    customerService
      .loadAllCustomers( errorNewCustomer )
      .then( function( customers ) {
        self.customers = [].concat(customers);
      });

    // Send new customer
    self.newCustomer = function() {
        if( self.newCustomerName == '' ) 
          return materialAlert("Atenção", "Preencha o nome!");

        var customer = {
            id        : Math.floor(Math.random() * 9999) +1,
            name      : self.newCustomerName,
            latitude  : self.marker.coords.latitude,
            longitude : self.marker.coords.longitude
        };

        self.customers.push(customer);
        
        storeNewCustomer(customer);

        self.newCustomerName = ""; 
    }

    // *********************************
    // Internal methods
    // *********************************

    function storeNewCustomer(customer) {
		var dbCustomer = {
		  firstName : customer.name,
		  location  : [ customer.longitude, customer.latitude ]
		};
		
        return customerService.postNewCustomer(dbCustomer)
                          .then(successNewCustomer, errorNewCustomer);
    }    
    
    function successNewCustomer() {
    	materialAlert("Legal", "Cadatrado com sucesso!");
    }
    
    function errorNewCustomer() {
    	materialAlert("Error", "Problemas :(");
    }
    
    function materialAlert(title, text) {
    	$mdDialog.show(
  	      $mdDialog.alert()
  	        .clickOutsideToClose(true)
  	        .title(title)
  	        .textContent(text) 
  	        .ok('Beleza!')
  	    );
    }

  }

})();
