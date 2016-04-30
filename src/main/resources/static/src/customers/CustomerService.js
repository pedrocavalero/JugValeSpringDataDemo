(function(){
  'use strict';

  angular.module('customers')
         .service('customerService', ['$q', '$http', CustomerService]);

  /**
   * Customers DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CustomerService($q, $http){
	  
    return {
      loadAllCustomers : function( error ) {
    	return $http.get('/customers')
    	            .then(transformCustomerDBObj, error);
      },
      postNewCustomer : function( customer ) {
    	  return $http.post('/customers', customer);
      }
    };
    
    function transformCustomerDBObj(data) {
    	var transformedCustomers = [];
    	
    	var customers = data.data._embedded.customers;
    	
    	for(var i = 0; i < customers.length; i++) {
    		var customer = customers[i];
    		
    		var transformedCustomer = {
	            id        : Math.floor(Math.random() * 9999) +1,
	            name      : customer.firstName
    		};
    		
    		if (customer.location !== null) {
    			transformedCustomer.latitude  = customer.location[1];
    			transformedCustomer.longitude = customer.location[0];
    		}    			
    		
    		transformedCustomers.push(transformedCustomer);
    	}
    	
    	return transformedCustomers;
    }    
  }

})();
