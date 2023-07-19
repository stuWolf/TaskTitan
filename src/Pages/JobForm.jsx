import React, { useState} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import {  useLocation, useNavigate} from 'react-router-dom';

function JobForm() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [installationAddress, setInstallationAddress] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [completion, setCompletion] = useState("");
  
  let location = useLocation();
  let status = location.state.status;
  let navigate = useNavigate();

  const handleNewJob = () => {
    navigate('/home',{ state: { status } });
    // Handle login
    console.log('loginpage' + {status})
  };

  console.log('home  ' + status)
  return (
    <div className="App">
      <Header />
      <Navbar status = {status} />

      <div className="login-form">
        <h2>Job Profile</h2>
        <p>User status: {status}</p>

        {status === "Draft" &&
        <div>
       <p>Customer Details</p> 
        <button onClick={handleNewJob}>Copy from profile</button>
        <input type="FirstName" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
       <input type="LastName" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
       <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
          <button onClick={handleNewJob}>Copy from Customer</button>
          <input type="installationAddress" value={installationAddress} onChange={e => setInstallationAddress(e.target.value)} placeholder="InstallationAddress" />
          <input type="jobdescription" value={jobdescription} onChange={e => setJobdescription(e.target.value)} placeholder="Scope of Work" />
          <input type="completion" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion" />
         
          
        
        

        </div>
        }

        {status === "Quoting" &&
        <p>Worker view: List jobs with status, assigned worker.</p> }
        
         {status === "Customer Approval" &&
         <div>
          <button onClick={handleNewJob}>Create New Job</button> 
          <p>Customer view: List jobs with status, specific to customer</p>
        </div>}

        {status === "Worker Assignment" &&
         <div>
          <button onClick={handleNewJob}>Create New Job</button> 
          <p>Customer view: List jobs with status, specific to customer</p>
        </div>}

        {status === "Job Implementation" &&
         <div>
          <button onClick={handleNewJob}>Create New Job</button> 
          <p>Customer view: List jobs with status, specific to customer</p>
        </div>}

        {status === "Customer Review" &&
         <div>
          <button onClick={handleNewJob}>Create New Job</button> 
          <p>Customer view: List jobs with status, specific to customer</p>
        </div>}

        {status === "Customer Approval"? (
          <div>
            <button onClick={handleNewJob}>Accept</button> 
            <button onClick={handleNewJob}>Reject</button>  
            <button onClick={handleNewJob}>Close</button>
        </div>
        ) : (
          <div>
            <button onClick={handleNewJob}>Submit</button> 
            <button onClick={handleNewJob}>Save</button> 
            <button onClick={handleNewJob}>Close</button>
             
        </div>
        )}
           
      </div>

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      <Side/>

      <Footer/> 
    </div>
  );
}

export default JobForm;
