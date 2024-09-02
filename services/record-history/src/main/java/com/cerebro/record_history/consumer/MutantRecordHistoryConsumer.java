package com.cerebro.record_history.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class MutantRecordHistoryConsumer {

    @RabbitListener(queues = {"req-mutant-history"})
    public void getMessange(@Payload Message<String> message){
        System.out.println(message);

    }

    
}
