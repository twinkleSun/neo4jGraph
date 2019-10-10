package com.graphdatabase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@EnableNeo4jRepositories
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class GraphApplication {

	public static void main(String[] args) {
		SpringApplication.run(GraphApplication.class, args);
	}

}
