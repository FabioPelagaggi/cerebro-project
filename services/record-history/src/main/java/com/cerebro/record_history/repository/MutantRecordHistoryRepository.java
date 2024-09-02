package com.cerebro.record_history.repository; // Updated package declaration

import org.springframework.data.jpa.repository.JpaRepository;

import com.cerebro.record_history.entities.MutantRecordHistory;

import java.util.List;

public interface MutantRecordHistoryRepository extends JpaRepository<MutantRecordHistory, Long> {
    List<MutantRecordHistory> findByRecordId(Long recordId);
}
