import React from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';

import './ContentBox.css';


interface ContentBoxProps {
    onSubimit: (mutantRecord: MutantRecord) => void;
}

const CreateContentBox: React.FC<ContentBoxProps> = ({ onSubimit }) => {
    
    const [mutantRecord, setmutantRecord] = React.useState<MutantRecord>({
        id: 0,
        name: '',
        realName: '',
        level: '',
        mutantPowers: [],
        description: '',
        image: ''
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
        'Acid Generation'
    ];

    return (
        <div className="content-box">
        <form onSubmit={() => onSubimit(mutantRecord)}>
            <div>
                <input type="text" placeholder="Name" value={mutantRecord.name} onChange={(e) => setmutantRecord({ ...mutantRecord, name: e.target.value })} />
            </div>
            <div>
                <input type="text" placeholder="Real Name" value={mutantRecord.realName} onChange={(e) => setmutantRecord({ ...mutantRecord, realName: e.target.value })} />
            </div>
            <div>
                <select value={mutantRecord.level} onChange={(e) => setmutantRecord({ ...mutantRecord, level: e.target.value })}>
                    <option value="">Select Level</option>
                    <option value="Omega">Omega</option>
                    <option value="Alpha">Alpha</option>
                    <option value="Beta">Beta</option>
                    <option value="Epsilon">Epsilon</option>
                </select>
            </div>

            <div>
                <h3>{mutantRecord.realName}</h3>
            </div>
            <div>
                <h3>{mutantRecord.level}</h3>
            </div>
{/*             <div>
                <h4>Mutant Powers</h4>
            </div> */}
            <div>
                <p>{mutantRecord.description}</p>
            </div>
            <button type="submit">Submit</button>
        </form>
           {/*  <div>
                <h2>Mutant Register</h2>
            </div>
            <div>
                <input type="text" placeholder="Name"/>
            </div>
            <div>
                <input va type="text" placeholder="Real Name"/>
            </div>
            <div>
                <select value={content.level} onChange={handleLevelChange}>
                    <option value="">Select Level</option>
                    <option value="Omega">Omega</option>
                    <option value="Alpha">Alpha</option>
                    <option value="Beta">Beta</option>
                    <option value="Epsilon">Epsilon</option>
                </select>
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
            </div> */}
        </div>
    );
}

export default CreateContentBox;
