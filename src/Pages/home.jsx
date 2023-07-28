import React from 'react';
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
    // console.log('loginpage' + {userStatus})
  };

// probably on the API side: 
// find all open jobs, filter out Job # (first 4 digits) Worker, Address, Date in, Quoted, Started, Status

// in react: put all filtered jobs in an array, display this array under the job column
// each row should be a link to the corresponding job. when clicked, display form with corresponding status and user roll
// manager should be able to see the whole form (now the visability is according to job status)
// link to job clicked -> job form opens -> call API to fetch data from Job collection-> fill form -> user updates form -> update job when form submit 


  // console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
      <p>User Status: {userStatus}</p>

      <div className="form-row">
        <h2>My Jobs</h2>
        
        {(userStatus === "manager"||userStatus === "customer" )&&
        <div>
        <button onClick={handleNewJob}>Create New Job</button>
        </div>
        }
      </div>
      <JobColumns />
        {userStatus === "manager" &&
        <div>
          <p>Manager view : List of all jobs with Status, assigned worker, quote, and customer details. Option to add new job or quote.</p> 
         </div>
        }

        {userStatus === "worker" &&
        <p>Worker view: List jobs with status, assigned worker.</p> }

         {userStatus === "customer" &&
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
