import React from 'react';
import { HistoryRecord } from 'src/entities/HistoryRecord';

interface HistoryContentBoxProps {
  historyRecords: HistoryRecord[];
}

const HistoryContentBox: React.FC<HistoryContentBoxProps> = ({ historyRecords }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  };

  return (
    <div className="history-content-box">
      <h2>Mutant Data History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Change Timestamp</th>
            <th>Change Type</th>
          </tr>
        </thead>
        <tbody>
          {historyRecords
            .sort((a, b) => new Date(b.changeTimestamp).getTime() - new Date(a.changeTimestamp).getTime())
            .map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{formatDate(record.changeTimestamp)}</td> {/* Format the timestamp */}
                <td>{record.changeType}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryContentBox;
