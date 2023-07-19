import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="App">
      <div className="navbar">
       
      
      <Link to="/home">Home</Link>
      <Link to="/openjobs">Open Jobs</Link>
      <Link to="/quotes">Quotes</Link>
      {/* <Link to="/assignments">Assignments</Link> */}
      <Link to="/reviews">Reviews</Link>
      <Link to="/search">Search</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Logout</Link>
      
      
      
      </div>

      

      
    </div>
  );
}

export default Navbar;