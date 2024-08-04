import React from 'react';

import 'src/app/app.css';
import { MutantRecord } from 'src/entities/MutantRecord';

import VerticalContainer from 'src/vertical-container/VerticalContainer';

import ReadContentBox from 'src/content-box/ReadContentBox';
import CreateContentBox from 'src/content-box/CreateContentBox';
import UpdateContentBox from 'src/content-box/UpdateContentBox';
import DeleteContentBox from 'src/content-box/DeleteContentBox';

export function App() {
  const [records, setRecords] = React.useState<MutantRecord[]>([]);

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
    </div>
  );
}

export default App;
