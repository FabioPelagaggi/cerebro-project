package com.cerebro.backend.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {
    @RabbitListener(queues = "myQueue") // Listen to the queue
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message); // Process message
    }
}