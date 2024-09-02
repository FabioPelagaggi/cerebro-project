package com.cerebro.backend.producer;

import java.util.List;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.entities.MutantRecord;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class MutantRequestProducer {

    @Autowired
    private AmqpTemplate amqpTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void createRecord(MutantRecordDto mutantRecordDto) throws JsonProcessingException {
        amqpTemplate.convertAndSend(
                "req-mutant-record",
                "req-mutant-record-rout-key",
                objectMapper.writeValueAsString(mutantRecordDto));
    }

    public void getAllRecords(List<MutantRecordDto> list) throws JsonProcessingException {
        amqpTemplate.convertAndSend(
                "req-mutant-record",
                "req-mutant-record-rout-key",
                objectMapper.writeValueAsString(list));
    }

    public void postMutantHistory(MutantRecord savedRecord, String action) throws JsonProcessingException {
        System.out.println("Create Mutant Record - postMutantHistory");
        amqpTemplate.convertAndSend(
                "req-mutant-history",
                "req-mutant-history-rout-key",
                objectMapper.writeValueAsString(new Object[] { savedRecord, action }));
    }
}