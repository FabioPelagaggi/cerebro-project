package com.cerebro.backend.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.cerebro.backend.entities.MutantRecord;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class MutantRecordsRepositoryTest {

    @Autowired
    private MutantRecordsRepository mutantRecordsRepository;

    @Test
    public void testSaveMutantRecord() {
        MutantRecord mutantRecord = new MutantRecord(null, "Wolverine", "Logan", "Alpha", new String[]{"Healing", "Strength"}, "Member of X-Men", "imageUrl");
        MutantRecord savedRecord = mutantRecordsRepository.save(mutantRecord);
        assertThat(savedRecord.getId()).isNotNull();
    }

    @Test
    public void testFindAllMutantRecords() {
        MutantRecord mutantRecord1 = new MutantRecord(null, "Wolverine", "Logan", "Alpha", new String[]{"Healing", "Strength"}, "Member of X-Men", "imageUrl");
        MutantRecord mutantRecord2 = new MutantRecord(null, "Storm", "Ororo Munroe", "Omega", new String[]{"Weather Manipulation"}, "Member of X-Men", "imageUrl");
        mutantRecordsRepository.save(mutantRecord1);
        mutantRecordsRepository.save(mutantRecord2);

        List<MutantRecord> records = mutantRecordsRepository.findAll();
        assertThat(records).hasSize(2);
    }

    @Test
    public void testFindMutantRecordById() {
        MutantRecord mutantRecord = new MutantRecord(null, "Wolverine", "Logan", "Alpha", new String[]{"Healing", "Strength"}, "Member of X-Men", "imageUrl");
        MutantRecord savedRecord = mutantRecordsRepository.save(mutantRecord);

        Optional<MutantRecord> foundRecord = mutantRecordsRepository.findById(savedRecord.getId());
        assertThat(foundRecord).isPresent();
        assertThat(foundRecord.get().getName()).isEqualTo("Wolverine");
    }

    @Test
    public void testDeleteMutantRecord() {
        MutantRecord mutantRecord = new MutantRecord(null, "Wolverine", "Logan", "Alpha", new String[]{"Healing", "Strength"}, "Member of X-Men", "imageUrl");
        MutantRecord savedRecord = mutantRecordsRepository.save(mutantRecord);

        mutantRecordsRepository.deleteById(savedRecord.getId());

        Optional<MutantRecord> foundRecord = mutantRecordsRepository.findById(savedRecord.getId());
        assertThat(foundRecord).isEmpty();
    }
}