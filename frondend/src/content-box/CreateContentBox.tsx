import React, { ChangeEvent } from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';

import './ContentBox.css';

interface ContentBoxProps {
  onSubmit: (mutantRecord: MutantRecord) => void;
}

const CreateContentBox: React.FC<ContentBoxProps> = ({ onSubmit }) => {
  const [mutantRecord, setMutantRecord] = React.useState<MutantRecord>({
    id: 0,
    name: '',
    realName: '',
    level: '',
    mutantPowers: [],
    description: '',
    image: '',
  });

  const mutantPowersList = [
    'Telepathy',
    'Telekinesis',
    'Time Travel',
    'Teleportation',
    'Super Strength',
    'Super Speed',
    'Healing Factor',
    'Flight',
    'Force Field',
    'Energy Blast',
    'Elemental Manipulation',
    'Elasticity',
    'Duplication',
    'Density Control',
    'Claws',
    'Chameleon',
    'Biokinesis',
    'Animal Mimicry',
    'Adaptation',
    'Acid Generation',
  ];

  function handleMutantPowersChange(
    event: ChangeEvent<HTMLSelectElement>
  ): void {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setMutantRecord({ ...mutantRecord, mutantPowers: selectedOptions });
  }

  return (
    <div className="content-box">
      <form onSubmit={() => onSubmit(mutantRecord)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={mutantRecord.name}
            onChange={(e) =>
              setMutantRecord({ ...mutantRecord, name: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Real Name"
            value={mutantRecord.realName}
            onChange={(e) =>
              setMutantRecord({ ...mutantRecord, realName: e.target.value })
            }
          />
        </div>
        <div>
          <select
            value={mutantRecord.level}
            onChange={(e) =>
              setMutantRecord({ ...mutantRecord, level: e.target.value })
            }
          >
            <option value="">Select Level</option>
            <option value="Omega">Omega</option>
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Epsilon">Epsilon</option>
          </select>
        </div>
        <div>
          <select
            multiple
            value={mutantRecord.mutantPowers}
            onChange={handleMutantPowersChange}
          >
            {mutantPowersList.map((power) => (
              <option key={power} value={power}>
                {power}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={mutantRecord.description}
            onChange={(e) =>
              setMutantRecord({ ...mutantRecord, description: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Image URL"
            value={mutantRecord.image}
            onChange={(e) =>
              setMutantRecord({ ...mutantRecord, image: e.target.value })
            }
          />
        </div>

        <div>
        <h4>Name</h4>
          <h3>{mutantRecord.name}</h3>
        </div>
        <div>
        <h4>Real Name</h4>
          <h3>{mutantRecord.realName}</h3>
        </div>
        <div>
          <h4>Level</h4>
          <h3>{mutantRecord.level}</h3>
        </div>
        <div>
          <h4>Mutant Powers</h4>
          <ul>
            {mutantRecord.mutantPowers.map((power) => (
              <li key={power}>{power}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Description</h4>
          <p>{mutantRecord.description}</p>
        </div>
        <div>
          <h4>Image</h4>
          <img src={mutantRecord.image} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateContentBox;
