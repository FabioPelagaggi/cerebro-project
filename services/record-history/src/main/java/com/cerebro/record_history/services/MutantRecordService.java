package com.cerebro.record_history.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cerebro.record_history.entities.MutantRecord;
import com.cerebro.record_history.entities.MutantRecordHistory;
import com.cerebro.record_history.repository.MutantRecordHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MutantRecordService {

    private final MutantRecordHistoryRepository mutantRecordHistoryRepository;

    public List<MutantRecordHistory> getAllRecordHistory() {
        return mutantRecordHistoryRepository.findAll();
    }

    public MutantRecordHistory getRecordHistoryById(Long id) {
        List<MutantRecordHistory> histories = mutantRecordHistoryRepository.findByRecordId(id);
        return histories.isEmpty() ? null : histories.get(0);
    }

    public MutantRecordHistory updateRecordHistory(Long id, MutantRecordHistory mutantRecordHistory) {
        MutantRecordHistory existingRecordHistory = mutantRecordHistoryRepository.findById(id).orElse(null);
        if (existingRecordHistory != null) {
            existingRecordHistory.setChangeTimestamp(mutantRecordHistory.getChangeTimestamp());
            existingRecordHistory.setChangeType(mutantRecordHistory.getChangeType());
            return mutantRecordHistoryRepository.save(existingRecordHistory);
        }
        return null;
    }

    public void deleteRecordHistory(Long id) {
        mutantRecordHistoryRepository.deleteById(id);
    }

    public MutantRecordHistory createRecordHistory(MutantRecord record, String changeType) {
        MutantRecordHistory history = new MutantRecordHistory();
        history.setRecordId(record.getId());        
        history.setChangeTimestamp(LocalDateTime.now());
        history.setChangeType(changeType);
        mutantRecordHistoryRepository.save(history);
        return history;
    }
}
