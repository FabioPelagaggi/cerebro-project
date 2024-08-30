import React, { useState } from 'react';

import 'src/app/app.css';
import { MutantRecord } from 'src/entities/MutantRecord';

import VerticalContainer from 'src/vertical-container/VerticalContainer';

import ReadContentBox from 'src/content-box/ReadContentBox';
import CreateContentBox from 'src/content-box/CreateContentBox';
import UpdateContentBox from 'src/content-box/UpdateContentBox';
import DeleteContentBox from 'src/content-box/DeleteContentBox';
import HistoryContentBox from 'src/content-box/HistoryContentBox';
import { HistoryRecord } from 'src/entities/HistoryRecord';
import OmegaLevelCountContentBox from 'src/content-box/OmegaLevelCountContentBox';

export function App() {
  const [records, setRecords] = React.useState<MutantRecord[]>([]);
  const [historyRecords, setHistoryRecords] = React.useState<HistoryRecord[]>([]);
  const [omegaLevelCount, setOmegaLevelCount] = React.useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MutantRecord | null>(null);

  const handleNewMutantClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (record: MutantRecord) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
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
            <button onClick={handleNewMutantClick}>New Mutant</button>
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
          <div>
            <h2>Update</h2>

            {records.map((record) => (
              <UpdateContentBox
                key={record.id}
                content={record}
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
                        setRecords([...records, data]);
                      }
                    });
                }}
              />
            ))}
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <div>
            <h2>Delete</h2>
            {records.map((record) => (
              <div key={record.id} style={{ display: 'flex', alignItems: 'center' }}>
                <span>{record.name}</span>
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
                }} style={{ marginLeft: '10px' }}>Delete</button>
              </div>
            ))}
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <div>
            <h2>Mutant Data History</h2>
            {historyRecords
              .sort((a, b) => new Date(b.changeTimestamp).getTime() - new Date(a.changeTimestamp).getTime())
              .map((record) => (
                <HistoryContentBox key={record.id} content={record} />
              ))}
          </div>
        </VerticalContainer>
      </div>
     {/*  <div>
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