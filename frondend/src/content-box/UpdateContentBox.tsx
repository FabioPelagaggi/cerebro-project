import React, { ChangeEvent } from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';
import { mutantsPowersList } from 'src/entities/MutantsPowersList';

interface ContentBoxProps {
  onSubmit: (mutantRecord: MutantRecord) => void;
  content: MutantRecord;
}

const UpdateContentBox: React.FC<ContentBoxProps> = ({ onSubmit, content }) => {
  const [mutantRecord, setMutantRecord] = React.useState<MutantRecord>(content);

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
            onChange={(event) =>
              setMutantRecord({ ...mutantRecord, name: event.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Real Name"
            value={mutantRecord.realName}
            onChange={(event) =>
              setMutantRecord({ ...mutantRecord, realName: event.target.value })
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
            {mutantsPowersList.map((power) => (
              <option key={power} value={power}>
                {power}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={mutantRecord.description}
            onChange={(event) =>
              setMutantRecord({
                ...mutantRecord,
                description: event.target.value,
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Image URL"
            value={mutantRecord.image}
            onChange={(event) =>
              setMutantRecord({ ...mutantRecord, image: event.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContentBox;