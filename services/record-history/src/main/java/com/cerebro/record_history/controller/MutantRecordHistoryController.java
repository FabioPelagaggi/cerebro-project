package com.cerebro.record_history.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cerebro.record_history.entities.MutantRecord;
import com.cerebro.record_history.entities.MutantRecordHistory;
import com.cerebro.record_history.services.MutantRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MutantRecordHistoryController {

    private final MutantRecordService mutantRecordService;

    @GetMapping("/mutants-history-records")
    public ResponseEntity<List<MutantRecordHistory>> getAllRecords() {
        return ResponseEntity.ok(mutantRecordService.getAllRecordHistory());
    }

    @GetMapping("/mutants-history-records/{id}")
    public ResponseEntity<MutantRecordHistory> getRecordById(@PathVariable Long id) {
        MutantRecordHistory record = mutantRecordService.getRecordHistoryById(id);
        return record != null ? ResponseEntity.ok(record) : ResponseEntity.notFound().build();
    }

    @PostMapping("/mutants-history-records")
    public ResponseEntity<MutantRecordHistory> createRecordHistory(@RequestBody MutantRecord mutantRecord, String changeType) {
        MutantRecordHistory createdRecordHistory = mutantRecordService.createRecordHistory(mutantRecord, changeType);
        return ResponseEntity.created(URI.create("/mutants-history-records/" + createdRecordHistory.getId())).body(createdRecordHistory);
    }
}
