import React, { ChangeEvent } from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';
import { mutantsPowersList } from 'src/entities/MutantsPowersList';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';

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
        <div className="margin-bottom">
          <TextField
            label="Name"
            value={mutantRecord.name}
            onChange={(event) =>
              setMutantRecord({ ...mutantRecord, name: event.target.value })
            }
          />
        </div>
        <div className="margin-bottom">
          <TextField
            label="Real Name"
            value={mutantRecord.realName}
            onChange={(event) =>
              setMutantRecord({ ...mutantRecord, realName: event.target.value })
            }
          />
        </div>
        <div className="margin-bottom">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select Level</InputLabel>
            <Select
              value={mutantRecord.level}
              onChange={(e) =>
                setMutantRecord({ ...mutantRecord, level: e.target.value })
              }
            >
              <MenuItem value=""><em>Select Level</em></MenuItem>
              <MenuItem value="Omega">Omega</MenuItem>
              <MenuItem value="Alpha">Alpha</MenuItem>
              <MenuItem value="Beta">Beta</MenuItem>
              <MenuItem value="Epsilon">Epsilon</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="margin-bottom">
          {mutantsPowersList.map((power) => (
            <FormControlLabel
              key={power}
              control={
                <Checkbox
                  checked={mutantRecord.mutantPowers.includes(power)}
                  onChange={(e) => {
                    const selectedOptions = e.target.checked
                      ? [...mutantRecord.mutantPowers, power]
                      : mutantRecord.mutantPowers.filter((p) => p !== power);
                    setMutantRecord({ ...mutantRecord, mutantPowers: selectedOptions });
                  }}
                />
              }
              label={power}
            />
          ))}
        </div>
        <div className="margin-bottom">
          <TextField
            label="Description"
            value={mutantRecord.description}
            onChange={(event) =>
              setMutantRecord({
                ...mutantRecord,
                description: event.target.value,
              })
            }
          />
        </div>
        <div className="margin-bottom">
          <TextField
            label="Image URL"
            value={mutantRecord.image}
            onChange={(event) =>
              setMutantRecord({ ...mutantRecord, image: event.target.value })
            }
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContentBox;