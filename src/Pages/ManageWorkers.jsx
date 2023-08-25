import React, { useState, useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import WorkerColumns from '../components/myWorkers/workerColumns';
import {  useNavigate} from 'react-router-dom';
import { getUsers, deleteUser } from "../services/userServices";
// import { Link } from 'react-router-dom';
function ManageWorkers() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
 let navigate = useNavigate();
const [userMessage, setUserMessage] = useState('')
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
      setErrorMessage('Fetching your Workers...');
      let workerData;  
      console.log('fetch worker called')
      // get all users with status Worker
      workerData = await getUsers("worker");
        
      // Check if workerData contains 'message404, not found'
      if (workerData.hasOwnProperty('message404')) {
        setErrorMessage("You have no workers yet. Register your workers with Add new Worker")
        return;
      }
    
      // Filter out the required fields
      const filteredWorkers = workerData.map((worker) => ({
        _id: worker._id || 'No Data',  
        firstName: worker.firstName || 'No Data',
        lastName: worker.lastName || 'No Data',
        email: worker.email || 'No Data',
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


  const handleDelete = async (workerId) => {
    try {
      console.log('workerId  '+ workerId)
        await deleteUser(workerId);
        // Remove the deleted worker from the state
        setWorkers(prevWorkers => prevWorkers.filter(worker => worker._id !== workerId));
        setUserMessage('A worker got deleted')
    } catch (error) {
        console.error('Failed to delete worker:', error);
        setErrorMessage("Could not delete worker");
    }
};

  // call API to fetch all workers 

  // write all workers documents in an array of workers
  // display each row as a link, 
  // if (job in jobStatus = work assignment) when click assign worker to job
  return (
    <div className="App">
      <Header />
      <Navbar userStatus={userStatus} />

      <div className="main-content">
        <h2>My Workers</h2>
        <p>User status: {userStatus}</p>
        <button onClick={handleWorker}>Add New Worker</button>
        
        <h2>    </h2>
        <div className="worker-container-and-side-panel">
          <div className="worker-container">
          <WorkerColumns/>
          <h2>    </h2>
            {workers.map((worker) => (
              <div key={worker._id} className="worker-details">
                {/* Delete button */}
                <button onClick={() => handleDelete(worker._id)} style={{ backgroundColor: 'red', color: 'white', margin: '19px' }}>Delete</button>

                <p>{worker.firstName}</p>
                <p>{worker.lastName}</p>
                {/* Make the email a clickable link */}
                <p><a href={`mailto:${worker.email}`}>{worker.email}</a></p>
                <p>{formatDate(worker.employedSince)}</p>
                <p>{worker.license}</p>
              </div>
            ))}
          </div>
          {/* end jobs container */}
         
          <Side userMessage = {userMessage} />
        </div> 
        {/* end job form and side panel */}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      {/* end main -content */}
      <Footer/> 
    </div>
);
}

export default ManageWorkers;
