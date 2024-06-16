package com.cerebro.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "mutant_record_history")
public class MutantRecordHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Long recordId;
    private String name;
    private String realName;
    private String level;
    private String[] mutantPowers;
    private String description;
    private String imageUrl;
    private LocalDateTime changeTimestamp;
    private String changeType; // CREATE, UPDATE, DELETE
}
