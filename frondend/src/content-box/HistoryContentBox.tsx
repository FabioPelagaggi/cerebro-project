import React from 'react';
import { MutantRecord } from 'src/entities/MutantRecord';

import './ContentBox.css';
import { HistoryRecord } from 'src/entities/HistoryRecord';

interface ContentBoxProps {
  content: HistoryRecord;
}

const HistoryContentBox: React.FC<ContentBoxProps> = ({ content }) => {
  const [records, setRecords] = React.useState<HistoryRecord>(content);

  return (
    <div className="content-box">
{/*         <div>
            <h2>{content.id}</h2>
        </div> */}
      <div>
        <h2>{content.name}</h2>
      </div>
      <div>
        <h4>Change Timestamp</h4>
        <p>{content.changeTimestamp}</p>
      </div>
      <div>
        <h4>Change Type</h4>
        <p>{content.changeType}</p>
      </div>
    </div>
  );
};

export default HistoryContentBox;
