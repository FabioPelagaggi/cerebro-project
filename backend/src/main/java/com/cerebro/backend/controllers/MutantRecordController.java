package com.cerebro.backend.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.services.MutantRecordService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequiredArgsConstructor
public class MutantRecordController {

    private final MutantRecordService mutantRecordService;

    @GetMapping("/mutants-records")
    public ResponseEntity<List<MutantRecordDto>> getAllRecords() {
        return ResponseEntity.ok(mutantRecordService.getAllRecords());
    }

    @PostMapping("/mutants-records")
    public ResponseEntity<MutantRecordDto> createRecord(@RequestBody MutantRecordDto mutantRecordDto) {
        MutantRecordDto createdRecord = mutantRecordService.createRecord(mutantRecordDto);

        return ResponseEntity.created(URI.create("/mutants-records/" + createdRecord.getId())).body(createdRecord);
    }

    @PutMapping("/mutants-records/{id}")
    public MutantRecordDto putMethodName(@PathVariable Long id, @RequestBody MutantRecordDto mutantRecordDto) {
        return mutantRecordService.updateRecord(id, mutantRecordDto);
    }

    @DeleteMapping("/mutants-records/{id}")
    public ResponseEntity<MutantRecordDto> deleteRecord(@PathVariable Long id) {
        return ResponseEntity.ok(mutantRecordService.deleteRecord(id));
    }

}
