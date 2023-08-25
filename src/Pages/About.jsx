import React, {  useEffect, useCallback } from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
// import Side from '../components/SidePanel';
// import WorkerColumns from '../components/myWorkers/workerColumns';
// import {  useNavigate} from 'react-router-dom';
import { getUsers } from "../services/userServices";
// import { Link } from 'react-router-dom';


export default function About() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
//  let navigate = useNavigate();

//  const [errorMessage, setErrorMessage] = useState("");
  // const userMessage = localStorage.getItem('userMessage');
  // to get back to jobform of actual job
  // const [jobIdHome, setJobIdHome] = useState(localStorage.getItem('workerJobID'));
  // const jobStatusJobForm = localStorage.getItem('jobStatus');
    // State to hold the workers


  const fetchWorkers = useCallback(async () => {
    try {
      let workerData;  
      
      // get all users with status Worker
      workerData = await getUsers("worker");
        
      // Check if workerData contains 'message404, not found'
      if (workerData.hasOwnProperty('message404')) {
        // setErrorMessage("You have no workers yet")
        return;
      }
    
      
        
    } catch (error) {
      console.error('Failed to fetch workers:', error);
      // setErrorMessage("could not fetch workers");
    }
  },[]);
  // end fetch workers
  
  useEffect(() => {
    // Fetch the open jobs when the component mounts
    fetchWorkers();
  }, [fetchWorkers]);
  
  

  // call API to fetch all workers 

  // write all workers documents in an array of workers
  // display each row as a link, 
  // if (job in jobStatus = work assignment) when click assign worker to job
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
        <h2>Release notes:</h2>
        <p>V 1.4 24/08/23:</p>
        <p>* Move Message matrix and job count function to SideBar </p>
        <p>* Display jobs of different cathegories in functional elements</p>
        <p>* Add review handling</p>
        <p>V 1.5 27/08/23:</p>
        <p>* Integrate new text fields into job form, check all fields if cmpleted </p>
        <h3>Planned features:</h3>
        <p>* Introduce emailing service</p>
        <p>* change update mechanism from polling based to event/ SSE element based</p>

      </div>
       {/* end main -content */}

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      {/* <Side/> */}

      <Footer/> 
    </div>
  );
}


