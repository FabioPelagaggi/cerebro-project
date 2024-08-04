package com.cerebro.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.cerebro.backend.dtos.MutantRecordDto;
import com.cerebro.backend.entities.MutantRecord;

@Mapper(componentModel = "spring")
public interface MutantRecordMapper {

    MutantRecord toMutantRecord(MutantRecordDto mutantRecordDto);

    MutantRecordDto toMutantRecordDto(MutantRecord mutantRecord);

    List<MutantRecordDto> toMutantRecordDtoList(List<MutantRecord> mutantRecordList);

    @Mapping(target = "id", ignore = true)
    void updateMutantRecord(@MappingTarget MutantRecordDto mutantRecordDto, MutantRecord mutantRecord);
}
