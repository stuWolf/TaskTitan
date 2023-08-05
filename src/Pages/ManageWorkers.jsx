import React, { useState, useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import WorkerColumns from '../components/workerColumns';
import {  useNavigate} from 'react-router-dom';
import { getUsers } from "../services/userServices";
import { Link } from 'react-router-dom';
function ManageWorkers() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
 let navigate = useNavigate();

 const [errorMessage, setErrorMessage] = useState("");
  // const userMessage = localStorage.getItem('userMessage');
  // to get back to jobform of actual job
  // const [jobIdHome, setJobIdHome] = useState(localStorage.getItem('workerJobID'));
  // const jobStatusJobForm = localStorage.getItem('jobStatus');
    // State to hold the workers
    const [workers, setWorkers] = useState([]);
  
  const handleWorker = () => {
    // Add new Worker button
    navigate('/addWorker');
    // could be signup with status 'new worker', just has extra fields
//  registerWorker(data)
  };


  const fetchWorkers = useCallback(async () => {
    try {
      let workerData;  
      
      // get all users with status Worker
      workerData = await getUsers("worker");
        
      // Check if workerData contains 'message404, not found'
      if (workerData.hasOwnProperty('message404')) {
        setErrorMessage("You have no workers yet")
        return;
      }
    
      // Filter out the required fields
      const filteredWorkers = workerData.map((worker) => ({
        _id: worker._id || 'No Data',  
        firstName: worker.firstName || 'No Data',
        lastName: worker.lastName || 'No Data',
        address: worker.address || 'No Data',
        employedSince: worker.employedSince || 'No Data',
        license: worker.license || 'No Data',
      }));
  
      // Set the filtered workers in state
      setWorkers(filteredWorkers);
        
    } catch (error) {
      console.error('Failed to fetch workers:', error);
      setErrorMessage("could not fetch workers");
    }
  },[]);
  // end fetch workers
  
  useEffect(() => {
    // Fetch the open jobs when the component mounts
    fetchWorkers();
  }, [fetchWorkers]);
  
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

  // call API to fetch all workers 

  // write all workers documents in an array of workers
  // display each row as a link, 
  // if (job in jobStatus = work assignment) when click assign worker to job
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
        <h2>My Workers</h2>
        <p>User status: {userStatus}</p>
        <button onClick={handleWorker}>Add New Worker</button>
        <WorkerColumns/>


        <div className="jobs-container">
        {workers.map((worker) => (
          <div key={worker._id} className="job-details">
            {/* go back to job form of ID = jobIdHome  and hand over worker id of selected worker when link on list clicked */}
            {/* <Link to={`/jobForm/${jobIdHome}/${worker._id}`}>{worker._id.slice(-4)}</Link> */}

            
            <p className="job-id"><Link to={`/jobForm/${(localStorage.getItem('workerJobID')) }`}>{worker._id.slice(-4)}</Link></p>

            {/* <p className="job-id"><Link to={`/jobForm/${jobIdHome }/${worker._id}`}>{worker._id.slice(-4)}</Link></p> */}

            <p>{worker.firstName}</p>
            <p>{worker.lastName}</p>
            <p>{worker.address}</p>
            <p>{formatDate(worker.employedSince)}</p>
            <p>{worker.license}</p>
          </div>
        ))}
      </div>
        {errorMessage && <p>{errorMessage}</p>}





      </div>
       {/* end main -content */}

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      <Side/>

      <Footer/> 
    </div>
  );
}

export default ManageWorkers;
