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
  const [jobStatus, setJobStatus] = useState("");
  let location = useLocation();
  let status = location.state.status;
  let navigate = useNavigate();

  const handleClose = () => {
    navigate('/home',{ state: { status } });
    // Handle login

    // console.log('loginpage' + {status})
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

  const handleProfile = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };

  const handleCustomerData = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };

  // const handleNewJob = () => {
  //   alert("TODO");
  //   // console.log('loginpage' + {status})
  // };

  const handleSave = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };

  console.log('home  ' + status)
  return (
    <div className="App">
      <Header />
      <Navbar status = {status} />

      <select value={jobStatus} onChange={e => setJobStatus(e.target.value)}>
              <option value="">JobStatus</option>
              <option value="Draft" >Draft</option>
              <option value="Quoting">Quoting</option>
              <option value="Customer Approval">Customer Approval</option>
              <option value="Worker Assignment">Worker Assignment</option>
              <option value="Job Implementation">Job Implementation</option>
              <option value="Customer Review">Customer Review</option>
          </select>



    <div className="job-form">
        <h2>Job Profile</h2>
        <p>User status: {status}</p>
{/***************************  Job Status DRAFT ******************************888*/}
        {jobStatus === "Draft" &&
        <div>
          <div className="form-row">
          <p>Customer Details:</p> 
          <button disabled={jobStatus !== "Draft"} onClick={handleProfile}>Copy from profile</button>
          </div>
        <div className="form-row">
         
            <input type="FirstName" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" disabled={jobStatus !== "Draft"} />
            <input type="LastName" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" disabled={jobStatus !== "Draft"} />
        </div>
        <div className="form-row">
            <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" disabled={jobStatus !== "Draft"} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" disabled={jobStatus !== "Draft"} />
            </div>
        <div className="form-row">
            <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" disabled={jobStatus !== "Draft"} />
            </div>
            
            <div className="form-row">
          
            <input type="installationAddress" value={installationAddress} onChange={e => setInstallationAddress(e.target.value)} placeholder="InstallationAddress" disabled={jobStatus !== "Draft"} />
            <button disabled={jobStatus !== "Draft"} onClick={handleCustomerData}>Copy from Customer</button>
        </div>
      
        <p>Scope of Work:</p> 
        <div className="form-row">
            <textarea value={jobdescription} onChange={e => setJobdescription(e.target.value)} placeholder="Scope of Work" disabled={jobStatus !== "Draft"} />
            </div>
            <p>Prefered completion date:</p> 
            <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} />
        
    </div>

       
      
        }
{/***************************  Job Status Quoting ******************************888*/}
        {jobStatus === "Quoting" &&
        <p>Quoting status</p> }
   {/***************************  Job Status  Customer Approval ******************************888*/}     
         {jobStatus === "Customer Approval" &&
         <div>
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Customer approval</p>
        </div>}
{/***************************  Job Status Worker Assignment******************************888*/}
        {jobStatus === "Worker Assignment" &&
         <div>
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Worker Assignment</p>
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
      {/* end div login form */}

      {/* Show side pannel */}
      <Side/>

      <Footer/> 
    </div>
  );
}

export default JobForm;
