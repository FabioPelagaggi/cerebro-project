import React from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';

import './ContentBox.css';


interface ContentBoxProps {
    content: number;
}

const OmegaLevelCountContentBox: React.FC<ContentBoxProps> = ({ content }) => {

    return (
        <div className="content-box">
            <div>
                <h2>Omega Level Threat Mutants</h2>
            </div>
            <div>
                <h3>{content}</h3>
            </div>
        </div>
    );
}

export default OmegaLevelCountContentBox;
