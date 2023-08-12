import React, { useState, useEffect } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import SelectWorker from '../components/selectWorker';
import ProgressBar from '../components/progressBar';
// import WorkerColumns from '../components/workerColumns';
// import {  useNavigate} from 'react-router-dom';

// import { Link } from 'react-router-dom';
function Search() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
//  let navigate = useNavigate();


  // const userMessage = localStorage.getItem('userMessage');
  // to get back to jobform of actual job
  // const [jobIdHome, setJobIdHome] = useState(localStorage.getItem('workerJobID'));
  // const jobStatusJobForm = localStorage.getItem('jobStatus');

 
  const statuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [userMessage, setSetUserMessage] = useState('');
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  
  // console.log(workers)


 

  useEffect(() => {
    setSetUserMessage(selectedStatus)
  }, [selectedStatus]);
 
  // call API to fetch all workers 

  const handleWorkerSelected = (workerId, firstName, license) => {
    console.log("Selected Worker ID:", workerId);
    console.log("Selected Worker First Name:", firstName);
    console.log("Selected Worker License:", license);
    // You can now use these values in the parent component
  };

  
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />
      <h2>Playground</h2>
      <div className="job-form-and-side-panel">
<div className="job-form">
       
        
        

 {/* Dropdown for selecting a status */}
 <select value={selectedStatus} onChange={handleStatusChange}>
        {statuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <h2>  </h2>
     

      <SelectWorker onWorkerSelected={handleWorkerSelected} />


      <ProgressBar jobStatus = {selectedStatus} />
      
       {/* end main -content */}

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      </div>
      <Side userMessage = {userMessage} />
      </div>
      <Footer/> 
    </div>
  );
}

export default Search;
