
import React from 'react';
import '../App.css';

function Side({userMessage}) {
  return (
    <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
        <p>{userMessage}</p>
      </div>
  );
}

export default Side;







