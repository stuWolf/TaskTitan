// import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';



function Navbar({userStatus}) {
  userStatus = userStatus.toLowerCase();
  const navigate = useNavigate();
  console.log('navbar  ' + userStatus)
  const handleNavigation = (path) => {
    
    navigate(path, { state: { userStatus } });
  };


  const handleLogout = async () => {

   
    localStorage.removeItem('userStatus');
     localStorage.removeItem('userId');
     localStorage.removeItem('token');
      navigate('/landing');
    
  };

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => handleNavigation('/home')}>Home</button>
        <button onClick={() => handleNavigation('/quotes')}>Quotes</button>
        <button onClick={() => handleNavigation('/completed')}>Completed Jobs</button>
        {userStatus === "manager" && 
          <button onClick={() => handleNavigation('/managerWorkers')}>My Workers</button>
        }
        <button onClick={() => handleNavigation('/reviews')}>Reviews</button>
        <div className="navbar-right">
          <button onClick={() => handleNavigation('/search')}>Search</button>
          <button onClick={() => handleNavigation('/profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
