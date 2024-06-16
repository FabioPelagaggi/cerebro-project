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
                
                /* return Arrays.asList(
                                new MutantRecordDto(
                                        1L,
                                        "Wolverine",
                                        "Logan",
                                        "Alpha",
                                        Arrays.asList("Regeneration", "Adamantium Claws", "Enhanced Senses"),
                                        "Wolverine is a mutant who possesses the ability to regenerate damaged or destroyed areas of his cellular structure at a rate far greater than that of an ordinary human.",
                                        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Wolverine_%28James_%27Logan%27_Howlett%29.png/250px-Wolverine_%28James_%27Logan%27_Howlett%29.png"),

                                new MutantRecordDto(
                                        2L,
                                        "Storm",
                                        "Ororo Munroe",
                                        "Omega",
                                        Arrays.asList("Atmokinesis", "Flight", "Weather Control"),
                                        "Storm is a mutant who possesses the psionic ability to control the weather over limited distances.",
                                        "https://cdna.artstation.com/p/assets/images/images/017/925/472/4k/stuart-cooper-storm-render-productionpaint2-artstation.jpg"),

                                new MutantRecordDto(
                                        3L,
                                        "Cyclops",
                                        "Scott Summers",
                                        "Beta",
                                        Arrays.asList("Optic Blast", "Energy Resistance", "Leadership"),
                                        "Cyclops is a mutant who possesses the ability to project powerful beams of concussive force from his eyes.",
                                        "https://static.wikia.nocookie.net/x-men/images/d/d2/Marvel_now_cyclops.jpeg/revision/latest?cb=20140912190737"),

                                new MutantRecordDto(
                                        4L,
                                        "Marvel Girl",
                                        "Jean Grey",
                                        "Omega",
                                        Arrays.asList("Telekinesis", "Telepathy", "Phoenix Force"),
                                        "Jean Grey is a mutant who possesses telepathic and telekinetic powers.",
                                        "https://static.wikia.nocookie.net/xmen-comics/images/b/bd/X-Men_Vol_5_1_Artgerm_Virgin_Variant.jpg/revision/latest?cb=20191110000838&path-prefix=pt-br"),

                                new MutantRecordDto(
                                        5L,
                                        "Magneto",
                                        "Max Eisenhardt",
                                        "Alpha",
                                        Arrays.asList("Magnetokinesis", "Metal Manipulation",
                                                        "Magnetic Flight"),
                                        "Magneto is a mutant who possesses the ability to generate and control magnetic fields.",
                                        "https://static.wikia.nocookie.net/x-men/images/0/0a/Magneto_Badass.jpg/revision/latest?cb=20220705140455"),

                                new MutantRecordDto(
                                        6L,
                                        "Mystique",
                                        "Raven Darkholme",
                                        "Beta",
                                        Arrays.asList("Shapeshifting", "Accelerated Healing", "Ageless"),
                                        "Mystique is a mutant who possesses the ability to shapeshift.",
                                        "https://cdna.artstation.com/p/assets/images/images/047/816/456/large/nicolas-lopez-closeup.jpg"),

                                new MutantRecordDto(
                                        7L,
                                        "Rogue",
                                        "Anna Marie",
                                        "Beta",
                                        Arrays.asList("Power Absorption", "Flight", "Super Strength"),
                                        "Rogue is a mutant who possesses the ability to absorb the powers, energies, memories, knowledge, talents, and physical abilities of other beings through physical contact.",
                                        "https://ominouspress.com/cdn/shop/products/112308frontnew_1024x1024@2x.jpg?v=1703199470"),

                                new MutantRecordDto(
                                        8L,
                                        "Gambit",
                                        "Remy LeBeau",
                                        "Beta",
                                        Arrays.asList("Kinetic Energy Manipulation", "Thief", "Super Agility"),
                                        "Gambit is a mutant who possesses the ability to charge matter with volatile kinetic energy, causing the object in question to explosively release its charge on impact.",
                                        "https://animecomics.com.br/animecomics/images/upload/11.jpg")                                        
                        ); */
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
