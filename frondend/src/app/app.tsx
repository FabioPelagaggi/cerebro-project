import React from 'react';

import 'src/app/app.css';
import { MutantRecord } from 'src/entities/MutantRecord';

import VerticalContainer from 'src/vertical-container/VerticalContainer';

import ReadContentBox from 'src/content-box/ReadContentBox';
import CreateContentBox from 'src/content-box/CreateContentBox';

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
            <CreateContentBox onSubimit={function (mutantRecord: MutantRecord): void {
              throw new Error('Function not implemented.');
            } } />
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
          </div>
        </VerticalContainer>
      </div>
      <div>
        <VerticalContainer>
          <div>
            <h2>Delete</h2>
          </div>
        </VerticalContainer>
      </div>
    </div>
  );
}

export default App;
