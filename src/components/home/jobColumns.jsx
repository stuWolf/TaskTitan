import React from 'react';
import '../../App.css';

export default function JobColumns() {
  return (
    <div className="App">
      <div className="jobColumns">
        <p>Customer Name</p>
        <p>Worker</p>
        <p>Job Address</p>
        <p>Date in</p>
        <p>Quoted</p>
        <p>Started</p>
        {/* <p>Completed</p> */}
        <p>Status</p>
        {/* <p>Notifications</p> */}
      </div>
    </div>
  );
}
