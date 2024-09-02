package com.cerebro.record_history;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
public class RecordHistoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecordHistoryApplication.class, args);
	}

}
