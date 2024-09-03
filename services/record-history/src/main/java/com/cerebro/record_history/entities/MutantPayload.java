package com.cerebro.record_history.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class MutantPayload {

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

    public MutantPayload(Long recordId, String name, String realName, String level, String[] mutantPowers,
            String description, String imageUrl, LocalDateTime changeTimestamp, String changeType) {
        this.recordId = recordId;
        this.name = name;
        this.realName = realName;
        this.level = level;
        this.mutantPowers = mutantPowers;
        this.description = description;
        this.imageUrl = imageUrl;
        this.changeTimestamp = changeTimestamp;
        this.changeType = changeType;
    }

    public MutantPayload(Long recordId, String name, String realName, String level, String[] mutantPowers,
            String description, String imageUrl) {
        this.recordId = recordId;
        this.name = name;
        this.realName = realName;
        this.level = level;
        this.mutantPowers = mutantPowers;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public MutantPayload(Long recordId, String name, String realName, String level, String[] mutantPowers,
            String description, String imageUrl, String changeType) {
        this.recordId = recordId;
        this.name = name;
        this.realName = realName;
        this.level = level;
        this.mutantPowers = mutantPowers;
        this.description = description;
        this.imageUrl = imageUrl;
        this.changeType = changeType;
    }

    @Override
    public String toString() {
        return "MutantPayload{" +
                "id=" + id +
                ", recordId=" + recordId +
                ", name='" + name + '\'' +
                ", realName='" + realName + '\'' +
                ", level='" + level + '\'' +
                ", mutantPowers=" + (mutantPowers != null ? Arrays.toString(mutantPowers) : "[]") +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", changeTimestamp=" + (changeTimestamp != null ? changeTimestamp.toString() : "null") +
                ", changeType='" + changeType + '\'' +
                '}';
    }
}