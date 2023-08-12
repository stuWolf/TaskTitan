
import React from 'react';
import '../App.css';

// user message needs to be an array of messages, 
// display usermessages as a stack, newest on top
// each message should be a link to the job that it relates to.
// when click display job on the corresponding user and workstep

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







