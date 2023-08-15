import React, { useState, useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import {getStatusJobs  } from "../services/jobsServices";
// import {getCountOfJobs, getOpenJobs,getMyJobsOpen, getAllJobsOpenWorker  } from "../services/jobsServices";
import {getUser} from '../services/userServices';
import JobColumns from '../components/home/jobColumns';
import { Link } from 'react-router-dom';
import DisplayJobs from "../components/home/displayJob";


// import JobForm from '../Pages/JobForm';
import {   useNavigate} from 'react-router-dom';

function Home() {

  // let location = useLocation();
  // let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // const [userMessage, setUserMessage] = useState('');
  // const [closedJobCount, setClosedJobCount] = useState('');
  // const [previousJobCount, setPreviousJobCount] = useState(0); // Add this state variable at the top of your component
  const [userMessage, setUserMessage] = useState(localStorage.getItem('userMessage') || "");
  // const [userMessage, setUserMessage] = useState('')
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


// interface for Displayjobs
const handleUserMessageChange = (message) => {
  setUserMessage(message);
  // Now, sidebarUserMessage contains the userMessage from DisplayJobs
  // You can use it as input for the sidebar or wherever you need it
};

const fetchJobs = useCallback(async () => {
  try {
    setErrorMessage('Fetching your Jobs...');
    let jobsData;  // array with all jobs rawdata
    // console.log('fetch jobs called')
    
   



    jobsData = await getStatusJobs(localStorage.getItem('userId'), userStatus, '!Closed');

    // setClosedJobCount( await getCountOfJobs(localStorage.getItem('userId'), userStatus, 'Closed'));

    // console.log('userId:  ' + localStorage.getItem('userId') + 'userStatus:  ' + userStatus + '')
      // Check if jobsData contains 'message404, not found'
      if (jobsData.hasOwnProperty('message404')) {
        if (userStatus === "worker"){
        setErrorMessage("There are  no jobs for you at the moment");
        } else if (userStatus === "customer"){
          setErrorMessage("No Jobs yet. Lodge your first job by clicking 'Create New Job' ");
        } else { setErrorMessage("No jobs recorded yet");}
        return;
      }

    // jobsData = await getStatusJobs(localStorage.getItem('userId'), userStatus, '!Closed');

    // const currentClosedJobCount = await getCountOfJobs(localStorage.getItem('userId'), userStatus, 'Closed');
    // // setClosedJobCount(currentClosedJobCount);

    // // Check if the new counter is greater than the previous counter
    // if (currentClosedJobCount > previousJobCount) {
    //   setUserMessage('Another Job Closed!');
    //   setPreviousJobCount(currentClosedJobCount); // Update the previous job count
    // }

      // Fetch the user name for each job
      // can't use this because it returns the number of all jobs,
      // however jobsData is different for every user
      // const numberOfJobs = await (getCountOfJobs())

// Fetch the worker and customer names for each job
for(let job of jobsData) {
  if(job.workerId) {
    const workerData = await getUser(job.workerId);
    job.workerId = workerData.firstName || 'No Name';
    // job.customer = 'fritz'
  } else {
    job.workerId = 'No Data';
  }


  if(job.customerId) {
    const customerData = await getUser(job.customerId)
    // const customerData = 'fritz'
      job.customer = customerData.firstName || 'No Name'
    } else {
      job.customer = 'No Data';
    }




}


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
// Set the filtered jobs in state
setJobs(filteredJobs);

// console.log('job.dateCreated' +  job.dateCreated)
    
    
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    setErrorMessage("could not fetch jobs");
  }
  setErrorMessage('');
},[]);
// end fetch jobs


useEffect(() => {
 // Fetch the open jobs when the component mounts
 fetchJobs();

 // Set up an interval to fetch jobs every 3 seconds
 const interval = setInterval(() => {
   fetchJobs();
 }, 5000); // 3000 milliseconds = 3 seconds

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

// console.log('username  ' + localStorage.getItem('userName'))
  // console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />
     
      <div className="main-content">
      <p>Welcome back {localStorage.getItem('userName')},  you are logged in as {userStatus}</p>

      <div className="form-row">
        <h2>My Jobs </h2>
        
        {(userStatus === "manager"||userStatus === "customer" )&&
        <div>
<div className="form-row">
        <button onClick={handleNewJob}>Create New Job</button>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
        </div>
        }
      </div>
      <JobColumns />
      <div className="jobs-container-and-side-panel">
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

           
              {/* open jobform with the jobID */}
              <p className="job-id"><Link to={`/jobForm/${job._id}`}>{job.customerName}</Link></p>  
              
              {/* Link to the job details page */}
              <p >{job.workerName}</p>
              <p>{getFirstFourWords(job.addressOfInstallation)}</p>
              <p>{formatDate(job.dateIn)}</p>
              <p>{formatDate(job.dateQuoted)}</p>
              <p>{formatDate(job.workStart)}</p>
              <p>{job.jobStatus}</p>
            </div>
          ))}
{/* <h2>Closed Jobs</h2> */}
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'!Closed'} 
                onUserMessageChange={handleUserMessageChange} 
            />
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'Closed'} 
                onUserMessageChange={handleUserMessageChange} 
            />



        </div>
        {/* end jobs container */}

       
        
      {/* only displays when there is an error message */}
       {/* Show side pannel */}
       <Side userMessage = {userMessage} />
      {/* no messages created here */}
      
      </div> 
        {/* end jobs containerand side panel */}
        
      </div>
      {/* end main -content */}  
      {/* {errorMessage && <p>{errorMessage}</p>} */}
      <Footer/> 
    </div>
  );
}

export default Home;
