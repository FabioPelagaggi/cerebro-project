package com.cerebro.backend.services;

import org.springframework.stereotype.Service;

import com.cerebro.backend.repositories.MutantRecordsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OmegaLevelMutantService {

    private final MutantRecordsRepository mutantRecordsRepository;

    public Long countOmegaLevelMutants() {
        return mutantRecordsRepository.countByLevel("Omega");
    }
}
