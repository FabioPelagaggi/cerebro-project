import React, { useState } from 'react';

import 'src/app/app.css';
import { MutantRecord } from 'src/entities/MutantRecord';

import VerticalContainer from 'src/vertical-container/VerticalContainer';

import { Card, CardContent, CardActions, Button, TextField, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';

import ReadContentBox from 'src/content-box/ReadContentBox';
import CreateContentBox from 'src/content-box/CreateContentBox';
import UpdateContentBox from 'src/content-box/UpdateContentBox';
import HistoryContentBox from 'src/content-box/HistoryContentBox';
import { HistoryRecord } from 'src/entities/HistoryRecord';
import OmegaLevelCountContentBox from 'src/content-box/OmegaLevelCountContentBox';


export function App() {
  const [records, setRecords] = React.useState<MutantRecord[]>([]);
  const [historyRecords, setHistoryRecords] = React.useState<HistoryRecord[]>([]);
  const [omegaLevelCount, setOmegaLevelCount] = React.useState<number>(0);

  const [isModalOpen, setIsNewMutantModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MutantRecord | null>(null);

  const handleNewMutantClick = () => {
    setIsNewMutantModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewMutantModalOpen(false);
  };

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

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/mutants-records', {
        method: 'GET',
      });
      if (response.status === 200) {
        const data = await response.json();
        setRecords(data);

        // Fetch history records for each mutant record
        const historyPromises = data.map((record: MutantRecord) =>
          fetch(`http://localhost:8080/mutants-records/${record.id}/history`, {
            method: 'GET',
          }).then((response) => (response.status === 200 ? response.json() : null))
        );

        const historyDataArray = await Promise.all(historyPromises);
        const allHistoryData = historyDataArray.flat().filter(Boolean);
        setHistoryRecords(allHistoryData);
      }
    };

    fetchData();

    const fetchOmegaLevelCount = async () => {
      const response = await fetch('http://localhost:8080/omega-level-mutants/count', {
        method: 'GET',
      });
      if (response.status === 200) {
        const data = await response.json();
        setOmegaLevelCount(data.count);
      }
    };

    fetchOmegaLevelCount();
  }, []);

  return (
    <div className="main-component">
      <div>
        <VerticalContainer>
          <div>
            <h2>Mutant Register</h2>
            <Button variant="contained" color="primary" onClick={handleNewMutantClick}>New Mutant</Button>
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={handleCloseModal}>&times;</span>
                  <CreateContentBox
                    onSubmit={function (mutantRecord: MutantRecord): void {
                      fetch('http://localhost:8080/mutants-records', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(mutantRecord),
                      })
                        .then((response) => {
                          if (response.status === 201) {
                            return response.json();
                          }
                          return null;
                        })
                        .then((data) => {
                          if (data !== null) {
                            setRecords([...records, data]);
                            handleCloseModal();
                          }
                        });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <div>
            <h2>Read</h2>
            {records.map((record) => (
              <ReadContentBox key={record.id} content={record} />
            ))}
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <div className="center">
            <h2>Update & Delete</h2>
            <table className="center-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="record-item">
                    <td>{record.name}</td>
                    <td>
                      <button onClick={() => setSelectedRecord(record)}>Update</button>
                      <button onClick={() => {
                        fetch(`http://localhost:8080/mutants-records/${record.id}`, {
                          method: 'DELETE',
                        })
                          .then((response) => {
                            if (response.status === 200) {
                              return response.json();
                            }
                            return null;
                          })
                          .then((data) => {
                            if (data !== null) {
                              setRecords(
                                records.filter((rec) => rec.id !== data.id)
                              );
                            }
                          });
                      }} className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedRecord && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setSelectedRecord(null)}>&times;</span>
                  <UpdateContentBox
                    content={selectedRecord}
                    onSubmit={function (record: MutantRecord): void {
                      fetch(`http://localhost:8080/mutants-records/${record.id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(record),
                      })
                        .then((response) => {
                          if (response.status === 200) {
                            return response.json();
                          }
                          return null;
                        })
                        .then((data) => {
                          if (data !== null) {
                            setRecords(records.map(rec => rec.id === data.id ? data : rec));
                            setSelectedRecord(null); // Close modal after update
                          }
                        });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <HistoryContentBox historyRecords={historyRecords} />
        </VerticalContainer>
      </div>
      {/* <div>
        <VerticalContainer>
          <div>
            <OmegaLevelCountContentBox content={omegaLevelCount} />
          </div>
        </VerticalContainer>
      </div> */}
    </div>
  );
}

export default App;