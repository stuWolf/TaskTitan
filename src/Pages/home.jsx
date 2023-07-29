import React, { useState, useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import { getOpenJobs, getAllJobsOpenWorker,getMyJobsOpen } from "../services/jobsServices";
import JobColumns from '../components/jobColumns';
import { Link } from 'react-router-dom';


// import JobForm from '../Pages/JobForm';
import {   useNavigate} from 'react-router-dom';

function Home() {

  // let location = useLocation();
  // let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const userMessage = localStorage.getItem('userMessage');
  const userStatus = localStorage.getItem('userStatus');

  const handleNewJob = () => {
    navigate('/jobForm');
    // Handle login
    // console.log('loginpage' + {userStatus})
  };

// probably on the API side: 

// find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus


// the manager sees all open jobs, the customer sees all jobs originated by him, 
// the worker sees all jobs assigned to him
// each row should be a link to the corresponding job. when clicked, display Job form, using search job by ID with corresponding status and user roll
// manager should be able to see the whole form for review (the visability of the form is according to job status)
// link to job clicked -> job form opens -> call API to fetch data from Job collection-> fill form -> user updates form -> update job when form submit 

// State to hold the jobs
const [jobs, setJobs] = useState([]);

const fetchJobs = useCallback(async () => {
  try {

    let jobsData;  // Declare jobsData here

    if(userStatus === "manager"){
      
      jobsData = await getOpenJobs();
    } else if (userStatus === "customer"){
      // Get all open jobs for logged in user
      jobsData = await getMyJobsOpen();
    } else if (userStatus === "worker"){
      // Get all open jobs for a logged in worker, by worker ID

     


      jobsData = await getAllJobsOpenWorker();
    }

      // Check if jobsData contains 'message404, not found'
      if (jobsData.hasOwnProperty('message404')) {
        if (userStatus === "worker"){
        setErrorMessage("There are  no jobs for you at the moment");
        } else if (userStatus === "customer"){
          setErrorMessage("You have not loged any jobs yet");
        } else { setErrorMessage("No jobs recorded yet");}
        return;
      }


      
    // console.log(jobsData)
  
// Filter out the required fields
const filteredJobs = jobsData.map((job) => ({
  _id: job._id,  // Last 4 digits of _id
  workerID: job.workerId,
  addressOfInstallation: job.addressOfInstallation,
  dateQuoted: job.dateQuoted,
  workStart: job.workStart,
  jobStatus: job.jobStatus,
}));
// Set the filtered jobs in state
setJobs(filteredJobs);


    
    
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    setErrorMessage("could not fetch jobs");
  }
},[userStatus]);



// setTimeout(() => {
   
// }, 5000); // 2000 milliseconds = 2 seconds


useEffect(() => {


  // Fetch the open jobs when the component mounts
  fetchJobs();
}, [fetchJobs]);

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;  // Months are 0-indexed in JavaScript
  const year = date.getFullYear().toString().slice(-2);  // Last 2 digits of year
  return `${day}/${month}/${year}`;
};

  // console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      {/* <Navbar userStatus = {userStatus} /> */}
      <Navbar userStatus = 'manager'/> 
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


       
          {/* <p>Manager view : List of all jobs with Status, assigned worker, quote, and customer details. Option to add new job or quote.</p>  */}
          {/* // find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus */}

<div className="jobs-container">
          {jobs.map((job) => (
            // Display the job details
            // Replace this with your actual UI
            <div key={job._id} className="job-details">
              {/* <Link to="/jobForm">SignIn</Link> */}
              <p className="job-id"><Link to={`/jobForm/${job._id}`}>{job._id.slice(-4)}</Link></p>  {/* Link to the job details page */}
              <p>{job.workerID.slice(-4)}</p>
              <p>{job.addressOfInstallation}</p>
              <p>{formatDate(job.dateQuoted)}</p>
              <p>{formatDate(job.workStart)}</p>
              <p>{job.jobStatus}</p>
            </div>
          ))}
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      


        
      
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
