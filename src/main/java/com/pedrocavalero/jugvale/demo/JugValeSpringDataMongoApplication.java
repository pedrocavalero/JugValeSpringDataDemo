package com.pedrocavalero.jugvale.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;

import com.pedrocavalero.jugvale.demo.model.Customer;
import com.pedrocavalero.jugvale.demo.repository.CustomerRepository;

@SpringBootApplication
public class JugValeSpringDataMongoApplication implements CommandLineRunner {

	@Autowired
	private CustomerRepository repository;
	
	public static void main(String[] args) {
		SpringApplication.run(JugValeSpringDataMongoApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of customers
		repository.save(new Customer("Pedro", "Cavalero", new double[] {-45.9076058,-23.1989236}));
		repository.save(new Customer("Clara", "Cavalero", new double[] {-45.9463807,-23.2650693}));

		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		for (Customer customer : repository.findAll()) {
			System.out.println(customer);
		}
		System.out.println();

		// fetch an individual customer
		System.out.println("Customer found with findByFirstName('Clara'):");
		System.out.println("--------------------------------");
		System.out.println(repository.findByFirstName("Clara"));

		System.out.println("Customers found with findByLastName('Cavalero'):");
		System.out.println("--------------------------------");
		for (Customer customer : repository.findByLastName("Cavalero")) {
			System.out.println(customer);
		}

	}
}
