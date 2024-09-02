package com.cerebro.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitConfig {
    @Bean
    public Queue myQueue() {
        return new Queue("myQueue", false); // Define a queue
    }
}