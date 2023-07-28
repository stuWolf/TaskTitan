import React, { useState, useEffect } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import { getOpenJobs } from "../services/jobsServices";
import JobColumns from '../components/jobColumns';
import { Link } from 'react-router-dom';


// import JobForm from '../components/JobForm';
import {  useLocation, useNavigate} from 'react-router-dom';

function Home() {

  let location = useLocation();
  let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const userMessage = localStorage.getItem('userMessage');
  const handleNewJob = () => {
    navigate('/jobForm',{ state: { userStatus } });
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

const fetchJobs = async () => {
  try {
    const jobsData = await getOpenJobs();
    // Filter out the required fields
    const filteredJobs = jobsData.map((job) => ({
      _id: job._id.slice(-4),  // Last 4 digits of _id
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
};

useEffect(() => {
  // Fetch the open jobs when the component mounts
  fetchJobs();
}, []);



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
          {/* // find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus */}

{jobs.map((job) => (
          // Display the job details
          // Replace this with your actual UI
          <div key={job._id}>
            <p>ID: <Link to={`/jobForm/${job._id}`}>{job._id}</Link></p>  {/*Link to the job details page */}
            <p>Worker ID: {job.workerID}</p>
            <p>Address: {job.addressOfInstallation}</p>
            <p>Date Quoted: {job.dateQuoted}</p>
            <p>Work Start: {job.workStart}</p>
            <p>Status: {job.jobStatus}</p>
          </div>
        ))}
        {errorMessage && <p>{errorMessage}</p>}
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
