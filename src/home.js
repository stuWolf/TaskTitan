import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="App">
      
      <div className="navbar">
        <a href="#home">Home</a>
        <a href="#openjobs">Open Jobs</a>
        <a href="#quotes">Quotes</a>
        {/* <a href="#assignments">Assignments</a> */}
        <a href="#reviews">Reviews</a>
        <a href="#search">Search</a>
        <a href="#profile">Profile</a>
        <a href="#logout">Logout</a>
      </div>

      <div className="main-content">
        <h2>Main Content</h2>
        <p>List of jobs with status, assigned worker, quote, and customer details. Option to add new job or quote.</p>
      </div>

      <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div>

      
    </div>
  );
}

export default Home;
