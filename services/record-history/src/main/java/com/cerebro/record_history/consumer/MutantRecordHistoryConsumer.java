package com.cerebro.record_history.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.cerebro.record_history.entities.MutantPayload;
import com.cerebro.record_history.entities.MutantRecordHistory;
import com.cerebro.record_history.repository.MutantRecordHistoryRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class MutantRecordHistoryConsumer {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final MutantRecordHistoryRepository mutantRecordHistoryRepository;

    public MutantRecordHistoryConsumer(MutantRecordHistoryRepository mutantRecordHistoryRepository) {
        this.mutantRecordHistoryRepository = mutantRecordHistoryRepository;
    }

    @RabbitListener(queues = { "req-mutant-history" })
    public void getMessange(@Payload Message<String> message) {

        String messageBody = message.getPayload();
        MutantPayload mutantPayload = new MutantPayload();

        try {
            mutantPayload = objectMapper.readValue(messageBody, MutantPayload.class);

            MutantRecordHistory mutantRecordHistory = new MutantRecordHistory(mutantPayload.getRecordId(),
                    mutantPayload.getName(), mutantPayload.getChangeType());

            mutantRecordHistoryRepository.save(mutantRecordHistory);

        } catch (JsonProcessingException e) {
            System.out.println("Error processing JSON: " + e.getMessage());
        }

    }

}
