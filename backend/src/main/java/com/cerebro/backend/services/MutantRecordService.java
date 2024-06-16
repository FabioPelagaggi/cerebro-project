package com.cerebro.backend.services;

import java.util.*;

import org.springframework.stereotype.Service;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.mappers.MutantRecordMapper;
import com.cerebro.backend.repositories.MutantRecordsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MutantRecordService {

        private final MutantRecordsRepository mutantRecordRepository;
        private final MutantRecordMapper mutantRecordMapper;

        public List<MutantRecordDto> getAllRecords() {
               return mutantRecordMapper.toMutantRecordDtoList(mutantRecordRepository.findAll());
        }

        public MutantRecordDto getRecordById(Long id) {

                MutantRecordDto mutantSearched = getAllRecords().stream()
                                .filter(mutant -> mutant.getId().equals(id))
                                .findFirst()
                                .orElse(null);

                return mutantSearched;
        }

        public MutantRecordDto createRecord(MutantRecordDto mutantRecordDto) {
                return mutantRecordDto;
        }

        public MutantRecordDto updateRecord(Long id, MutantRecordDto mutantRecordDto) {

                MutantRecordDto mutantUpdated = getRecordById(id);

                return mutantRecordDto;
        }

        public MutantRecordDto deleteRecord(Long id) {

                MutantRecordDto mutantDeleted = getRecordById(id);

                return mutantDeleted;

        }

}
