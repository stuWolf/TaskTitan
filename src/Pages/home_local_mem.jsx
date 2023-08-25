import React, { useState, useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import { getOpenJobs, getAllJobsOpenWorker,getMyJobsOpen, getCountOfJobs, getCountOfJobsWorker  } from "../services/jobsServices";
import {getUser} from '../services/userServices';
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
  // State to hold the jobs
  const [jobs, setJobs] = useState([]);

  const handleNewJob = () => {
// Create new job button pressed
// localStorage.setItem('jobStatus', "Draft");
    navigate('/jobForm/New');
    // Handle login
    // console.log('loginpage' + {userStatus})
  };

//  on the API side: 

// find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus


// the manager sees all open jobs, the customer sees all jobs originated by him, 
// the worker sees all jobs assigned to him
// each row should be a link to the corresponding job. when clicked, display Job form, using search job by ID with corresponding status and user roll
// manager should be able to see the whole form for review (the visability of the form is according to job status -> visibilityManager.js)
// link to job clicked -> job form opens -> call API to fetch data from Job collection-> fill form -> user updates form -> update job when form submit 



let usersCache = {}; // Cache for user data

const fetchJobs = useCallback(async () => {
  try {
    let response;
    // console.log('get open jobs')
    // Check the number of jobs based on userStatus
    if (userStatus === "manager") {
      // console.log('Marker0 ')
      response = await getCountOfJobs();
    } else if (userStatus === "customer") {
      response = await getCountOfJobs('userId');
    } else if (userStatus === "worker") {
      response = await getCountOfJobsWorker(localStorage.getItem('userId'));
    }
    // console.log('Marker1 ')
    let jobsData = JSON.parse(localStorage.getItem('jobsData') || 'null');
    const numberOfJobs = response.totalJobs;
    console.log('numberOfJobs '  + numberOfJobs  )
    // If the number of jobs has increased or jobsData doesn't exist in localStorage, fetch the data
    // inaddition to that we need to poll and update every 3s. to get job updates
    console.log('numberOfJobs:  ' + numberOfJobs + '  jobsData.length:  '+ jobsData.length)
    // console.log('Marker 2 ')

    // when page gets loaded: get jobdata from server. if in local storage, get out of local storage
    if (!jobsData || numberOfJobs > (jobsData.length || 0)) {
      
      if (userStatus === "manager") {
        console.log('Marker1 ')
        console.log('get open jobs called')
        jobsData = await getOpenJobs();
      } else if (userStatus === "customer") {
        jobsData = await getMyJobsOpen();
      } else if (userStatus === "worker") {
        jobsData = await getAllJobsOpenWorker();
      }
      localStorage.setItem('jobsData', JSON.stringify(jobsData)); // Save to localStorage
    }

      // Cache the fetched jobsData
    //   jobsDataCache = jobsData;
    

    // Handle 'message404, not found'
    if (jobsData.hasOwnProperty('message404')) {
      handleErrorMessage(userStatus);
      return;
    }

    // Fetch user data in parallel
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const customerPromises = jobsData.map(async job => {
    if (!usersCache[job.customerId]) {
        await delay(100);
        const data = await getUser(job.customerId);
        usersCache[job.customerId] = data.firstName || 'No Name';
        job.customer = usersCache[job.customerId];
    } else {
        job.customer = usersCache[job.customerId];
    }
});

const workerPromises = jobsData.map(async job => {
    if (job.workerId) {
        if (!usersCache[job.workerId]) {
            await delay(100);
            const data = await getUser(job.workerId);
            usersCache[job.workerId] = data.firstName || 'No Name';
            job.workerId = usersCache[job.workerId];
        } else {
            job.workerId = usersCache[job.workerId];
        }
    } else {
        job.workerId = 'No Data';
    }
});


    await Promise.all([...customerPromises, ...workerPromises]);

    // Filter out the required fields
    const filteredJobs = jobsData.map((job) => ({
        _id: job._id || 'No Data',  // Last 4 digits of _id
        workerName: job.workerId || 'No Data',
      // extract this dataset out of each job in jobs.data
        //  customerName: job.workerId
        customerName: job.customer,
        addressOfInstallation: job.addressOfInstallation|| 'No Data',
        dateIn: job.dateCreated || 'No Data',
        dateQuoted: job.dateQuoted || 'No Data',
        workStart: job.workStarted || 'No Data',
        jobStatus: job.jobStatus || 'No Data',
        
      }));

    setJobs(filteredJobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    setErrorMessage("could not fetch jobs");
  }
}, []); // end callback

function handleErrorMessage(userStatus) {
  if (userStatus === "worker") {
    setErrorMessage("There are no jobs for you at the moment");
  } else if (userStatus === "customer") {
    setErrorMessage("No Jobs yet. Lodge your first job by clicking 'Create New Job'");
  } else {
    setErrorMessage("No jobs recorded yet");
  }
}

// end fetch jobs


// setTimeout(() => {
   
// }, 5000); // 2000 milliseconds = 2 seconds


useEffect(() => {
 // Fetch the open jobs when the component mounts
 fetchJobs();

 // Set up an interval to fetch jobs every 3 seconds
 const interval = setInterval(() => {
   fetchJobs();
 }, 3000); // 3000 milliseconds = 3 seconds

 // Clean up function to clear the interval when the component is unmounted
 return () => clearInterval(interval);
}, []);

// Function to format the date
const formatDate = (dateString) => {
if(dateString === 'No Data'){
return 'No Data';

}else{
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;  // Months are 0-indexed in JavaScript
  const year = date.getFullYear().toString().slice(-2);  // Last 2 digits of year
  return `${day}/${month}/${year}`;
}



 
}; // end format date
function getFirstFourWords(str) {
  return str.split(' ').slice(0, 4).join(' ');
}
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


       
          {/* <p>Manager view : List of all jobs with Status, assigned worker, quote, and customer details. Option to add new job or quote.</p>  */}
          {/* // find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus */}

<div className="jobs-container">
{[...jobs].reverse().map((job) => (
            // Display the job details
            // Replace this with your actual UI
            <div key={job._id} className="job-details" style={{ borderBottom: '1px solid #ccc' }}>

              {/* <Link to="/jobForm">SignIn</Link> */}
              {/* open jobform with the jobID */}
              <p className="job-id"><Link to={`/jobForm/${job._id}`}>{job.customerName}</Link></p>  
              {/* <p className="job-id"><Link to={`/jobForm/${job._id}`}>{job._id.slice(-8)}</Link></p>  job.customerName */}
              {/* Link to the job details page */}
              <p>{job.workerName}</p>
              <p>{getFirstFourWords(job.addressOfInstallation)}</p>
              <p>{formatDate(job.dateIn)}</p>
              <p>{formatDate(job.dateQuoted)}</p>
              <p>{formatDate(job.workStart)}</p>
              <p>{job.jobStatus}</p>
            </div>
          ))}
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      {/* only displays when there is an error message */}


        
      
      </div>
      {/* end main -content */}

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
