package com.cerebro.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cerebro.backend.services.OmegaLevelMutantService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OmegaLevelMutantController {

    private final OmegaLevelMutantService omegaLevelMutantService;

    @GetMapping("/omega-level-mutants/count")
    public ResponseEntity<Long> getOmegaLevelMutantCount() {
        Long count = omegaLevelMutantService.countOmegaLevelMutants();
        return ResponseEntity.ok(count);
    }
}
