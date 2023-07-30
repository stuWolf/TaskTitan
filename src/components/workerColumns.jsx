import React from 'react';
import '../App.css';

export default function WorkerColumns() {
  return (
    <div className="App">
      <div className="workerColumns">
        <p>Worker #</p>
        <p>Name</p>
        <p>Surname</p>
        <p>Address</p>
        <p>Employed since</p>
        {/* <p>Y Experience</p> */}
        <p>Qualification</p>
     
      </div>
    </div>
  );
}
