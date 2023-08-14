import React , { useState, useEffect, useCallback }from 'react';
import '../../App.css';
import {getCountOfJobs,getStatusJobs  } from "../../services/jobsServices";
// import {getCountOfJobs, getOpenJobs,getMyJobsOpen, getAllJobsOpenWorker  } from "../services/jobsServices";
import {getUser} from '../../services/userServices';
import { Link } from 'react-router-dom';

export default function DisplayJobs({user_id, userStatus, jobStatus, onUserMessageChange}) {
  
    const [errorMessage, setErrorMessage] = useState("");
     const [previousJobCount, setPreviousJobCount] = useState(0); // Add this state variable at the top of your component
    // const [userMessage, setUserMessage] = useState(localStorage.getItem('userMessage') || "");
    const [userMessage, setUserMessage] = useState('')
    // const userStatus = localStorage.getItem('userStatus');
    // State to hold the jobs
    const [jobs, setJobs] = useState([]);
  
 

    const fetchJobs = useCallback(async () => {
        try {
          setErrorMessage('Fetching your Jobs...');
          let jobsData;  // array with all jobs rawdata
          // console.log('fetch jobs called')
        
          
      
              jobsData = await getStatusJobs(user_id, userStatus, jobStatus);
          
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
          

      
         

     
      
            // Fetch the user name for each job
            // can't use this because it returns the number of all jobs,
            // however jobsData is different for every user
            // const numberOfJobs = await (getCountOfJobs())
      
      // Fetch the worker and customer names for each job
      for(let job of jobsData) {
        if(job.workerId) {
          const workerData = await getUser(job.workerId);
          job.workerId = workerData.firstName || 'Deleted';
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




        const currentClosedJobCount = await getCountOfJobs(localStorage.getItem('userId'), userStatus, jobStatus);
        // setClosedJobCount(currentClosedJobCount);
    
        // Check if the new counter is greater than the previous counter
        if (currentClosedJobCount > previousJobCount) {
          setUserMessage('Another Job Closed!');



         // after the first time only update jobs when counter has increased
         fetchJobs();
 // update jobs
 setPreviousJobCount(currentClosedJobCount); // Update the previous job count
}

         
       }, 5000); // 3000 milliseconds = 3 seconds
      
       // Clean up function to clear the interval when the component is unmounted
       return () => clearInterval(interval);
      }, []);


 // Whenever userMessage changes, inform the parent component
 useEffect(() => {
    if (onUserMessageChange) {
        onUserMessageChange(userMessage);
    }
}, [userMessage, onUserMessageChange]);

      
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
      
      {/* <div className="jobs-container"> */}
      {/* <h2>Closed Jobs</h2> */}
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
        {/* </div> */}
        {/* end jobs container */}
        {/* {errorMessage && <p>{errorMessage}</p>} */}
    </div>
  );
}
