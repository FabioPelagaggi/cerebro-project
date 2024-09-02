package com.cerebro.backend.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.entities.MutantRecordHistory;
import com.cerebro.backend.services.MutantRecordService;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MutantRecordController {

    private final MutantRecordService mutantRecordService;

    @GetMapping("/mutants-records")
    public ResponseEntity<List<MutantRecordDto>> getAllRecords() {
        return ResponseEntity.ok(mutantRecordService.getAllRecords());
    }

    @GetMapping("/mutants-records/{id}")
    public ResponseEntity<MutantRecordDto> getRecordById(@PathVariable Long id) {
        MutantRecordDto record = mutantRecordService.getRecordById(id);
        return record != null ? ResponseEntity.ok(record) : ResponseEntity.notFound().build();
    }

    @PostMapping("/mutants-records")
    public ResponseEntity<MutantRecordDto> createRecord(@RequestBody MutantRecordDto mutantRecordDto) throws JsonProcessingException {
        MutantRecordDto createdRecord = mutantRecordService.createRecord(mutantRecordDto);
        return ResponseEntity.created(URI.create("/mutants-records/" + createdRecord.getId())).body(createdRecord);
    }

    @PutMapping("/mutants-records/{id}")
    public ResponseEntity<MutantRecordDto> updateRecord(@PathVariable Long id, @RequestBody MutantRecordDto mutantRecordDto) {
        MutantRecordDto updatedRecord = mutantRecordService.updateRecord(id, mutantRecordDto);
        return updatedRecord != null ? ResponseEntity.ok(updatedRecord) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/mutants-records/{id}")
    public ResponseEntity<MutantRecordDto> deleteRecord(@PathVariable Long id) {
        MutantRecordDto deletedRecord = mutantRecordService.deleteRecord(id);
        return deletedRecord != null ? ResponseEntity.ok(deletedRecord) : ResponseEntity.notFound().build();
    }

    @GetMapping("/mutants-records/{id}/history")
    public ResponseEntity<List<MutantRecordHistory>> getRecordHistory(@PathVariable Long id) {
        List<MutantRecordHistory> history = mutantRecordService.getRecordHistory(id);
        return ResponseEntity.ok(history);
    }
}
