import React, { useState, useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
// import WorkerColumns from '../components/workerColumns';
// import {  useNavigate} from 'react-router-dom';
import { getUsers } from "../services/userServices";
// import { Link } from 'react-router-dom';
function Search() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
//  let navigate = useNavigate();

 const [errorMessage, setErrorMessage] = useState("");
  // const userMessage = localStorage.getItem('userMessage');
  // to get back to jobform of actual job
  // const [jobIdHome, setJobIdHome] = useState(localStorage.getItem('workerJobID'));
  // const jobStatusJobForm = localStorage.getItem('jobStatus');
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const statuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  
  // console.log(workers)


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
  
 
  // call API to fetch all workers 

  const handleWorkerChange = (event) => {
    const workerId = event.target.value;
    const worker = workers.find(w => w._id === workerId);
    setSelectedWorker(worker);
  };


  
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />
      <h2>Playground</h2>
      <div className="job-form-and-side-panel">
<div className="job-form">
       
        
        {errorMessage && <p>{errorMessage}</p>}
{/* Dropdown for selecting a worker */}
<select onChange={handleWorkerChange}>
          <option value="">Select a worker</option>
          {workers.map(worker => (
            <option key={worker._id} value={worker._id}>
              {worker.firstName} {worker.lastName}
            </option>
          ))}
        </select>

        {/* Display selected worker's details */}
        {selectedWorker && (
          <div>
            <p>Worker ID: {selectedWorker._id}</p>
            <p>First Name: {selectedWorker.firstName}</p>
            <p>Last Name: {selectedWorker.lastName}</p>
            <p>License: {selectedWorker.license}</p>
          </div>
        )}

 {/* Dropdown for selecting a status */}
 <select value={selectedStatus} onChange={handleStatusChange}>
        {statuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <h2>  </h2>
      {/* Progress bar */}
      <div className="progress-bar">
        {statuses.map((status, index) => (
          <div 
            key={status} 
            className={`progress-bar-item ${index < statuses.indexOf(selectedStatus) + 1 ? 'active' : ''}`}
          >
            {status}
          </div>
        ))}
      </div>

      
       {/* end main -content */}

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      </div>
      <Side/>
      </div>
      <Footer/> 
    </div>
  );
}

export default Search;
