package com.cerebro.backend.repositories;

import com.cerebro.backend.entities.MutantRecordHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MutantRecordHistoryRepository extends JpaRepository<MutantRecordHistory, Long> {
    List<MutantRecordHistory> findByRecordId(Long recordId);
}
