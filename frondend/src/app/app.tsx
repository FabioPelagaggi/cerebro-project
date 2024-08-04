import React from 'react';

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

  React.useEffect(() => {
    fetch('http://localhost:8080/mutants-records', {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        if (data !== null) {
          setRecords(data);
          // Fetch history records for each mutant record
          data.forEach((record: MutantRecord) => {
            fetch(`http://localhost:8080/mutants-records/${record.id}/history`, {
              method: 'GET',
            })
              .then((response) => {
                if (response.status === 200) {
                  return response.json();
                }
                return null;
              })
              .then((historyData) => {
                if (historyData !== null) {
                  setHistoryRecords((prevHistoryRecords) => [
                    ...prevHistoryRecords,
                    ...historyData,
                  ]);
                }
              });
          });
        }
      });

      // Fetch omega level mutants count
    fetch('http://localhost:8080/omega-level-mutants/count', {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        if (data !== null) {
          setOmegaLevelCount(data.count);
        }
      });
  }, []);

  return (
    <div className="main-component">
      <div>
        <VerticalContainer>
          <div>
            <h2>Mutant Register</h2>
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
                    }
                  });
              }}
            />
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
              <DeleteContentBox
                key={record.id}
                content={record}
                onSubmit={function (id: number): void {
                  fetch(`http://localhost:8080/mutants-records/${id}`, {
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
                          records.filter((record) => record.id !== data.id)
                        );
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
            <h2>Mutant Data History</h2>
            {historyRecords.map((record) => (
              <HistoryContentBox key={record.id} content={record} />
            ))}
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <div>
            <OmegaLevelCountContentBox content={omegaLevelCount} />
          </div>
        </VerticalContainer>
      </div>
    </div>
  );
}

export default App;