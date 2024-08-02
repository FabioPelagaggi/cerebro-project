package com.cerebro.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.entities.MutantRecord;
import com.cerebro.backend.entities.MutantRecordHistory;
import com.cerebro.backend.mappers.MutantRecordMapper;
import com.cerebro.backend.repositories.MutantRecordHistoryRepository;
import com.cerebro.backend.repositories.MutantRecordsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MutantRecordService {

    private final MutantRecordsRepository mutantRecordRepository;
    private final MutantRecordHistoryRepository mutantRecordHistoryRepository;
    private final MutantRecordMapper mutantRecordMapper;

    public List<MutantRecordDto> getAllRecords() {
        return mutantRecordMapper.toMutantRecordDtoList(mutantRecordRepository.findAll());
    }

    public MutantRecordDto getRecordById(Long id) {
        MutantRecord mutantRecord = mutantRecordRepository.findById(id).orElse(null);
        return mutantRecord != null ? mutantRecordMapper.toMutantRecordDto(mutantRecord) : null;
    }

    public MutantRecordDto createRecord(MutantRecordDto mutantRecordDto) {
        MutantRecord mutantRecord = mutantRecordMapper.toMutantRecord(mutantRecordDto);
        MutantRecord savedRecord = mutantRecordRepository.save(mutantRecord);
        saveHistory(savedRecord, "CREATE");
        return mutantRecordMapper.toMutantRecordDto(savedRecord);
    }

    public MutantRecordDto updateRecord(Long id, MutantRecordDto mutantRecordDto) {
        MutantRecord existingRecord = mutantRecordRepository.findById(id).orElse(null);
        if (existingRecord == null) {
            return null;
        }

        existingRecord.setName(mutantRecordDto.getName());
        existingRecord.setRealName(mutantRecordDto.getRealName());
        existingRecord.setLevel(mutantRecordDto.getLevel());
        existingRecord.setMutantPowers(mutantRecordDto.getMutantPowers().toArray(new String[0]));
        existingRecord.setDescription(mutantRecordDto.getDescription());
        existingRecord.setImage(mutantRecordDto.getImage());

        MutantRecord updatedRecord = mutantRecordRepository.save(existingRecord);
        saveHistory(updatedRecord, "UPDATE");
        return mutantRecordMapper.toMutantRecordDto(updatedRecord);
    }

    public MutantRecordDto deleteRecord(Long id) {
        MutantRecord existingRecord = mutantRecordRepository.findById(id).orElse(null);
        if (existingRecord == null) {
            return null;
        }

        mutantRecordRepository.deleteById(id);
        saveHistory(existingRecord, "DELETE");
        return mutantRecordMapper.toMutantRecordDto(existingRecord);
    }

    public List<MutantRecordHistory> getRecordHistory(Long recordId) {
        return mutantRecordHistoryRepository.findByRecordId(recordId);
    }

    private void saveHistory(MutantRecord record, String changeType) {
        MutantRecordHistory history = new MutantRecordHistory();
        history.setRecordId(record.getId());
        history.setName(record.getName());
        history.setRealName(record.getRealName());
        history.setLevel(record.getLevel());
        history.setMutantPowers(record.getMutantPowers());
        history.setDescription(record.getDescription());
        history.setImageUrl(record.getImage());
        history.setChangeTimestamp(LocalDateTime.now());
        history.setChangeType(changeType);
        mutantRecordHistoryRepository.save(history);
    }
}
