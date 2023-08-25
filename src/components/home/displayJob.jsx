import React , { useState, useEffect, useCallback }from 'react';
import '../../App.css';
import {getCountOfJobs,getStatusJobs  } from "../../services/jobsServices";
import {getUser} from '../../services/userServices';
import { Link } from 'react-router-dom';

export default function DisplayJobs({user_id, userStatus, jobStatus}) {
  
    const [errorMessage, setErrorMessage] = useState("");
     const [previousJobCount, setPreviousJobCount] = useState(0); // Add this state variable at the top of your component
     const [pollingInterval, setPollingInterval] = useState(10000); // Start with 5 seconds
    //  const pollingIntervalRef = useRef(10000);
     
     const [noChangeCount, setNoChangeCount] = useState(0); // Count how many times no change is detected
 
    // State to hold the jobs
    const [jobs, setJobs] = useState([]);
  
 //console.log('display jobs mounts')

    const fetchJobs = useCallback(async (flag) => {
        try {
          if (flag === 'first'){
            //console.log(flag)
            setErrorMessage('Fetching your Jobs...');
          }
          
          let jobsData;  // array with all jobs rawdata
          
        
      
      
          jobsData = await getStatusJobs(user_id, userStatus, jobStatus);
      //  console.log(jobStatus)
          // console.log('userId:  ' + localStorage.getItem('userId') + 'userStatus:  ' + userStatus + '')
            // Check if jobsData contains 'message404, not found'
            if (jobsData.hasOwnProperty('message404')) {
              if ((userStatus === "worker")&&(jobStatus === 'Job Implementation')){
              setErrorMessage(`No jobs for you at the moment`);
              
              // delete displayed jobs
            } else if ((userStatus === "customer")&&(jobStatus === 'Customer Approval')){
              setErrorMessage(`No jobs for you at the moment`);
              

              } else if ((userStatus === "manager")&&(jobStatus === 'Quoting')){
                setErrorMessage("No jobs to Quote on at the moment ");
              // } else if ((userStatus === "manager")&&(jobStatus === 'Quoting')){
              //   setErrorMessage("No jobs to Quote on at teh moment ");
              } else { setErrorMessage("");}
              setJobs([])
              return;
            }
      
          
      
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
      },[jobStatus]);
      // end fetch jobs
      
      
      useEffect(() => {
        //console.log('pollingInterval display ' + pollingInterval )
        const fetchAndUpdateJobs = async () => {
            const response = await getCountOfJobs(user_id, userStatus, jobStatus);
            const currentCount = response.totalJobs;
            // console.log('jobStatus ' + jobStatus)
            // console.log('currentCount ' + currentCount)
           
            if (currentCount > previousJobCount) {
                // Reset the polling interval and no change count when a change is detected
                setPollingInterval(10000);
                setNoChangeCount(0);
                fetchJobs('2nd');
                setPreviousJobCount(currentCount);
            } else {
                // Increase the no change count
                setNoChangeCount(prevCount => prevCount + 1);
// console.log('noChangeCount display'  ,noChangeCount)
                // If no changes are detected for 3 consecutive polls, double the polling interval
                if (noChangeCount >= 3) {
                    setPollingInterval(prevInterval => prevInterval * 2);
                    setNoChangeCount(0); // Reset the no change count
                }
            }
        };

        fetchJobs('first');
        //console.log('  fetchJobs(first); called')
// fetch jobs the first time
        const interval = setInterval(() => {
            fetchAndUpdateJobs();
            //console.log('// fetch jobs and update counter')
   // fetch jobs and update counter
        }, pollingInterval);

        return () => clearInterval(interval);
    }, [previousJobCount,jobStatus,pollingInterval]);
    
//[previousJobCount, userStatus, jobStatus, pollingInterval, noChangeCount]
      
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
      // console.log('jobStatus  '+jobStatus)
        // console.log('jobs  ' + jobs)
        //console.log('polling interval Display ' + pollingInterval)
  
    return (
    <div className="App">
      
      {/* <div className="jobs-container"> */}
      {/* <div className="form-row"> */}
       
            {errorMessage && <p>{  errorMessage}</p>}

         



      
{jobs && jobs.length > 0  && 

  <div>
    {
  (jobStatus === '!Closed') ? 
    <h3> Active Jobs: </h3> 
  : 
    (jobStatus === 'Closed') ? 
      <h3> Closed Jobs: </h3> 
    : 
      <h3> Jobs need {jobStatus}</h3>
}


      
      {/* don't display if there are no jobs */}

{/* {errorMessage && <p>{  errorMessage}</p>} */}
      {/* </div> */}
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
        </div>}

    </div>
  );
}
