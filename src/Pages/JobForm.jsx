import React, { useState} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import JobFormCustomer from '../components/JobFormCustomer';
import {  useLocation, useNavigate} from 'react-router-dom';

function JobForm() {
  const [licenseNr, setLicenseNr] = useState("");
  const [workerName, setWorkerName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");

  // const [address, setAddress] = useState("");
  // const [installationAddress, setInstallationAddress] = useState("");
  // const [jobdescription, setJobdescription] = useState("");
  // const [completion, setCompletion] = useState("");
  const [jobStatus, setJobStatus] = useState("Draft");
    // This state determines whether the form is visible or not
  const [isFormVisible, setIsFormVisible] = useState(true)
  let location = useLocation();
  let status = location.state.status;
  let navigate = useNavigate();
  const handleClose = () => {
    navigate('/home',{ state: { status } });
    // Handle login

    // console.log('loginpage' + {status})
  };
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAccept = () => {
    
    // Handle login
    alert("TODO");
    // console.log('loginpage' + {status})
  };

  const handleReject = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };

  const handleSubmit = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };

 

  const handleSave = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };
  

  const handleAssignWorker = () => {
    navigate('/managerWorkers',{ state: { status } });
    // console.log('loginpage' + {status})
  };

  
  console.log('home  ' + status)
  return (
    <div className="App">
      <Header />
      <Navbar status = {status} />

      <select value={jobStatus} onChange={e => setJobStatus(e.target.value)}>
              {/* <option value="">JobStatus</option> */}
              <option value="Draft" >Draft</option>
              <option value="Quoting">Quoting</option>
              <option value="Customer Approval">Customer Approval</option>
              <option value="Worker Assignment">Worker Assignment</option>
              <option value="Job Implementation">Job Implementation</option>
              <option value="Customer Review">Customer Review</option>
          </select>



    <div className="job-form">
        <h2>Job Profile</h2>
        <div className="form-row">
        <p>User status: {status}</p>
        <p>Job status: {jobStatus}</p>
        </div>
      </div>
{/***************************  Job Status DRAFT ******************************888*/}
<div className="job-form">
<button onClick={toggleForm}>Toggle Customer data</button>
      {isFormVisible && (
        <div className="job-form">
          <JobFormCustomer jobStatus = {jobStatus}/>
        </div>
      )}



{/* this form will always displayed but when Job status is not Draft, the fields will be grayed out */}
      
{/***************************  Job Status DRAFT ******************************888*/}






       
        

   {/***************************  Job Status  Customer Approval ******************************888*/}     
         {jobStatus === "Customer Approval" &&
         <div>
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>For approval please confirm Clicking ACCEPT</p>
        </div>}
{/***************************  Job Status Worker Assignment******************************888*/}
        {jobStatus === "Worker Assignment" &&
          <div className="job-form">
            <p>Your Electrical Worker </p>
          <div className="form-row">
          
          <input type="licenseNr" value={licenseNr} onChange={e => setLicenseNr(e.target.value)} placeholder="License Number" disabled={jobStatus !== "Worker Assignment"} />
          <input type="workerName" value={workerName} onChange={e => setWorkerName(e.target.value)} placeholder="Worker Name" disabled={jobStatus !== "Worker Assignment"} />
          <button disabled={jobStatus !== "Worker Assignment"} onClick={handleAssignWorker}>Assign Electrical Worker</button>
          </div>
          </div>}
{/***************************  Job Status Job Implementation ******************************888*/}
        {jobStatus === "Job Implementation" &&
         <div>
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Job Implementation</p>
        </div>}
{/***************************  Job Customer Review ******************************888*/}
        {jobStatus === "Customer Review" &&
         <div>
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Customer Review</p>
        </div>}

        {jobStatus === "Customer Approval"? (
          <div>
            <button onClick={handleAccept}>Accept</button> 
            <button onClick={handleReject}>Reject</button>  
            <button onClick={handleClose}>Close</button>
        </div>
        ) : (
          <div>
            <button onClick={handleSubmit}>Submit</button> 
            <button onClick={handleSave}>Save</button> 
            <button onClick={handleClose}>Close</button>
             
        </div>
        )}  
        {/* end Job Status */}
           
      </div>  
      {/* end div job form */}

      {/* Show side pannel */}
      <Side/>

      <Footer/> 
    </div>
  );
}

export default JobForm;
