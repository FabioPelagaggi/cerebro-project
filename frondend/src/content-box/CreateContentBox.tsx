import React, { ChangeEvent } from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';
import { Card, CardContent, CardActions, Button, TextField, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';

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
    'Invisibility',
    'Phoenix Force',
    'Time Manipulation',
    'Super Strength',
    'Super Speed',
    'Healing Factor',
    'Flight',
    'Force Field',
    'Energy Blast',
    'Elemental',
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

  function handleMutantPowersChange(event: ChangeEvent<HTMLInputElement>): void {
    const selectedPowers = event.target.checked
      ? [...mutantRecord.mutantPowers, event.target.value]
      : mutantRecord.mutantPowers.filter((p) => p !== event.target.value);
    setMutantRecord({ ...mutantRecord, mutantPowers: selectedPowers });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    onSubmit(mutantRecord);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Create New Mutant
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={mutantRecord.name}
            onChange={(e) => setMutantRecord({ ...mutantRecord, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Real Name"
            value={mutantRecord.realName}
            onChange={(e) => setMutantRecord({ ...mutantRecord, realName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            SelectProps={{ native: true }}
            value={mutantRecord.level}
            onChange={(e) => setMutantRecord({ ...mutantRecord, level: e.target.value })}
            margin="normal"
          >
            <option value="" disabled>Select Level</option>
            <option value="Omega">Omega</option>
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Epsilon">Epsilon</option>
          </TextField>
          <Box mt={2}>
            {mutantPowersList.map((power) => (
              <FormControlLabel
                key={power}
                control={
                  <Checkbox
                    value={power}
                    checked={mutantRecord.mutantPowers.includes(power)}
                    onChange={handleMutantPowersChange}
                  />
                }
                label={power}
              />
            ))}
          </Box>
          <TextField
            fullWidth
            label="Description"
            value={mutantRecord.description}
            onChange={(e) => setMutantRecord({ ...mutantRecord, description: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={mutantRecord.image}
            onChange={(e) => setMutantRecord({ ...mutantRecord, image: e.target.value })}
            margin="normal"
          />
          <CardActions>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateContentBox;
