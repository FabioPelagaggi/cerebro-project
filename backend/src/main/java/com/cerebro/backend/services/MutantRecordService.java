package com.cerebro.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.entities.MutantRecord;
import com.cerebro.backend.entities.MutantRecordHistory;
import com.cerebro.backend.exceptions.AppException;
import com.cerebro.backend.mappers.MutantRecordMapper;
import com.cerebro.backend.producer.MutantRequestProducer;
import com.cerebro.backend.repositories.MutantRecordHistoryRepository;
import com.cerebro.backend.repositories.MutantRecordsRepository;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MutantRecordService {

    @Autowired
    private MutantRequestProducer mutantRequestProducer;

    private final MutantRecordsRepository mutantRecordRepository;
    private final MutantRecordHistoryRepository mutantRecordHistoryRepository;
    private final MutantRecordMapper mutantRecordMapper;

    public List<MutantRecordDto> getAllRecords() {

        List<MutantRecord> mutantRecords = mutantRecordRepository.findAll();

        try {
            mutantRequestProducer.getAllRecords(mutantRecordMapper.toMutantRecordDtoList(mutantRecords));
        } catch (JsonProcessingException e) {
            throw new AppException("Error processing JSON", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return mutantRecordMapper.toMutantRecordDtoList(mutantRecords);
    }

    public MutantRecordDto getRecordById(Long id) {
        MutantRecord mutantRecord = mutantRecordRepository.findById(id).orElse(null);
        return mutantRecord != null ? mutantRecordMapper.toMutantRecordDto(mutantRecord) : null;
    }

    public MutantRecordDto createRecord(MutantRecordDto mutantRecordDto) throws JsonProcessingException {
        try {
            mutantRequestProducer.createRecord(mutantRecordDto);
        } catch (JsonProcessingException e) {
            throw new AppException("Error processing JSON", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        MutantRecord mutantRecord = mutantRecordMapper.toMutantRecord(mutantRecordDto);
        MutantRecord savedRecord = mutantRecordRepository.save(mutantRecord);
        
        mutantRequestProducer.postMutantHistory(savedRecord, "CREATE");

        return mutantRecordMapper.toMutantRecordDto(savedRecord);
    }

    public MutantRecordDto updateRecord(Long id, MutantRecordDto mutantRecordDto) {
        MutantRecord existingRecord = mutantRecordRepository.findById(id)
                .orElseThrow(() -> new AppException("Record not found with id: " + id, HttpStatus.NOT_FOUND));

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
        MutantRecord existingRecord = mutantRecordRepository.findById(id)
                .orElseThrow(() -> new AppException("Record not found with id: " + id, HttpStatus.NOT_FOUND));

        MutantRecordDto deletedRecord = mutantRecordMapper.toMutantRecordDto(existingRecord);
        mutantRecordRepository.deleteById(id);
        saveHistory(existingRecord, "DELETE");
        return deletedRecord;
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
