package com.cerebro.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.services.MutantRecordService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
public class MutantRecordController {

    private final MutantRecordService mutantRecordService;

    @GetMapping("/mutants-records")
    public ResponseEntity<List<MutantRecordDto>> getAllRecords() {
        return ResponseEntity.ok(mutantRecordService.getAllRecords());
    }

    @PostMapping("/reg-mutant")
    public ResponseEntity<MutantRecordDto> createRecord(@RequestBody MutantRecordDto mutantRecordDto) {
        return ResponseEntity.ok(mutantRecordService.createRecord(mutantRecordDto));
    }

    @PutMapping("/update-mutant")
    public ResponseEntity<MutantRecordDto> updateRecord(@RequestBody MutantRecordDto mutantRecordDto) {
        return ResponseEntity.ok(mutantRecordService.updateRecord(null, mutantRecordDto));
    }

    /*
     * @DeleteMapping("/delete-mutant")
     * public ResponseEntity<MutantRecordDto> deleteRecord(@RequestBody Long id) {
     * return ResponseEntity.of(mutantRecordService.deleteRecord(id));
     * }
     */

}
