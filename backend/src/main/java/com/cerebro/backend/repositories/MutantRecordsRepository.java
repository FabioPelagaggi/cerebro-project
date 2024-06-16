package com.cerebro.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cerebro.backend.entities.MutantRecord;

public interface MutantRecordsRepository extends JpaRepository<MutantRecord, Long>{
    
}
