package com.cerebro.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.entities.MutantRecord;

@Mapper(componentModel = "spring")
public interface MutantRecordMapper {

    MutantRecord toMutantRecord(MutantRecordDto mutantRecordDto);

    MutantRecordDto toMutantRecordDto(MutantRecord mutantRecord);

    List<MutantRecordDto> toMutantRecordDtoList(List<MutantRecord> mutantRecordList);
}
