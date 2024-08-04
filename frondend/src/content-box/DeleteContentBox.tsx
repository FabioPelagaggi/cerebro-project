import React, { ChangeEvent } from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';

import './ContentBox.css';

interface ContentBoxProps {
  onSubmit: (id: number) => void;
  content: MutantRecord;
}

const DeleteContentBox: React.FC<ContentBoxProps> = ({ onSubmit, content }) => {
  const [mutantRecord, setMutantRecord] = React.useState<MutantRecord>(content);

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
      <form onSubmit={() => onSubmit(mutantRecord.id)}>
      <div>
                <h2>{content.name}</h2>
            </div>
            <div className="content-box-img">
                <img src={content.image} alt={content.name}/>
            </div>
            <div>
                <h3>{content.realName}</h3>
            </div>
            <div>
                <h3>{content.level}</h3>
            </div>
            <div>
                <h4>Mutant Powers</h4>
                <ul>
                    {content.mutantPowers.map((power) => (
                        <li key={power}>{power}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>{content.description}</p>
            </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default DeleteContentBox;
