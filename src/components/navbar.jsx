import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Navbar({status}) {
  const navigate = useNavigate();
  console.log('navbar  ' + status)
  const handleNavigation = (path) => {
    
    navigate(path, { state: { status } });
  };

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => handleNavigation('/home')}>Home</button>
        <button onClick={() => handleNavigation('/quotes')}>Quotes</button>
        <button onClick={() => handleNavigation('/completed')}>Completed Jobs</button>
        {status === "Manager" && 
          <button onClick={() => handleNavigation('/managerWorkers')}>My Workers</button>
        }
        <button onClick={() => handleNavigation('/reviews')}>Reviews</button>
        <div className="navbar-right">
          <button onClick={() => handleNavigation('/search')}>Search</button>
          <button onClick={() => handleNavigation('/profile')}>Profile</button>
          <button onClick={() => handleNavigation('/landing')}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
