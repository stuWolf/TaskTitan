import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Navbar({state}) {
  return (
    <div className="App">
      <div className="navbar">
       
      
      <Link to="/home">Home</Link> 
      {/* all */}
      <Link to="/quotes">Quotes</Link>
      {/* customer only for logged in customer,  manager (all) */}
      <Link to="/completed">Completed Jobs</Link>
      {/* customer only for logged in customer, worker (only for loged in worker), manager (all) */}
     {state === "Manager"  && <Link to="/managerWorkers">My Workers</Link>}
     
      
      {/* <Link to="/assignments">Assignments</Link> */}
      <Link to="/reviews">Reviews</Link>
      <div className="navbar-right">
        <Link to="/search">Search</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/landing">Logout</Link>
      </div>
      
      
      </div>

      

      
    </div>
  );
}

export default Navbar;