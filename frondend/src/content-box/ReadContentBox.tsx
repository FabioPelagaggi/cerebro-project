import React from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';

import './ContentBox.css';


interface ContentBoxProps {
    content: MutantRecord;
}

const ReadContentBox: React.FC<ContentBoxProps> = ({ content }) => {
    const [records, setRecords] = React.useState<MutantRecord>(content);

    return (
        <div className="content-box">
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
        </div>
    );
}

export default ReadContentBox;
