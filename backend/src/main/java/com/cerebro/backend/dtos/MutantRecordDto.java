package com.cerebro.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MutantRecordDto {

    private Long id;
    private String name;
    private String realName;
    private String level;
    private List<String> mutantPowers;
    private String description;
    private String image;
    public MutantRecordDto orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }

}
