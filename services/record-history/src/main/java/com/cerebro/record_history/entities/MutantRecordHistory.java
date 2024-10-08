package com.cerebro.record_history.entities;

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
    private LocalDateTime changeTimestamp;
    private String changeType;

    public MutantRecordHistory(Long recordId, String name, String changeType) {
        this.recordId = recordId;
        this.name = name;
        this.changeTimestamp = LocalDateTime.now();
        this.changeType = changeType;
    }
}
