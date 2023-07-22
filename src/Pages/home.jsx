import React , { useState} from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import JobColumns from '../components/jobColumns';
// import JobForm from '../components/JobForm';
import {  useLocation, useNavigate} from 'react-router-dom';

function Home() {

  let location = useLocation();
  let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  const userMessage = localStorage.getItem('userMessage');
  const handleNewJob = () => {
    navigate('/jobForm',{ state: { userStatus } });
    // Handle login
    console.log('loginpage' + {userStatus})
  };

  console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
      <p>User Status: {userStatus}</p>

      <div className="form-row">
        <h2>My Jobs</h2>
        
        {(userStatus === "Manager"||userStatus === "Customer" )&&
        <div>
        <button onClick={handleNewJob}>Create New Job</button>
        </div>
        }
      </div>
      <JobColumns />
        {userStatus === "Manager" &&
        <div>
          <p>Manager view : List of all jobs with Status, assigned worker, quote, and customer details. Option to add new job or quote.</p> 
         </div>
        }

        {userStatus === "Worker" &&
        <p>Worker view: List jobs with status, assigned worker.</p> }

         {userStatus === "Customer" &&
         <div>

        <p>Customer view: List jobs with status, specific to customer</p>
         
        </div>}
      
      </div>

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      <Side userMessage = {userMessage} />

      <Footer/> 
    </div>
  );
}

export default Home;
