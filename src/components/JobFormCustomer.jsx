import React, { useState, useEffect} from "react";
import '../App.css';

import { getLoggedInUser } from "../services/userServices";
import {updateJob} from "../services/jobsServices"

function JobFormCustomer({jobStatus,  jobId}) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [installationAddress, setInstallationAddress] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [completion, setCompletion] = useState("");
  const [quoted, setQuoted] = useState("");
  const [quoteAmmount, setQuoteAmmount] = useState("");

  useEffect(() => {
    // Fetch the user details when the component mounts

    const fetchUser = async () => {
      try {
        const userData = await getLoggedInUser();
        // console.log("(job.jobStatus)  "  + jobStatus)
        console.log('userData:', userData);
        // setJob(jobData);
        // setJobStatus(jobData.jobStatus);
      } catch (error) {
        console.error('Failed to fetch user in job form customer:', error);
      }
    };
    fetchUser();


  }, [jobId]);

// const jobStatus = "Draft";
  const handleProfile = (userData) => {

    setFirstName(userData.firstName)
    setLastName(userData.lastName)
    setPhone(userData.contactNumber)
    setEmail(userData.email)
    setAddress(userData.address)

    // alert("TODO");
    // console.log('loginpage' + {status})
  };

  const handleCustomerData = () => {
    alert("TODO");
    // console.log('loginpage' + {status})
  };

 
 
  

//   console.log('home  ' + status)
  return (
    <div className="App">
      

     

   
{/***************************  Job Status DRAFT ******************************888*/}

<div className="job-form">
       

          <div className="form-row">

          <p>Customer Details:</p> 
          <button disabled={jobStatus !== "Draft"} onClick={handleProfile}>Copy from profile</button>
          {/* <p>Job status: {jobStatus}</p> */}
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
            <div className="form-row">
            <p>Prefered completion date:</p> 
            <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} />
            </div>
        </div>

      {/***************************  Job Status Quoting ******************************888*/}

      {(jobStatus === "Quoting" || jobStatus === "Customer Approval")&& <div className="job-form">
      <div className="form-row">
        <p>Date Created by customer: </p>
    
        <input className="date-input" type="date" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} />
    
      </div>
        <div className="form-row">
          
        <p>Date Quoted by manager: </p>
     
        <input className="date-input" type="date" value={quoted} onChange={e => setQuoted(e.target.value)} placeholder="Date Quoted" disabled={jobStatus !== "Quoting"} />
        </div>
      
        <div className="form-row">
        <p>Ammount Quoted AUD </p>
        <input type="quoteAmmount" value={quoteAmmount} onChange={e => setQuoteAmmount(e.target.value)} placeholder="Quote Ammount" disabled={jobStatus !== "Quoting"} />
        <p>Quote attached </p>
        </div>
        {/* <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} /> */}
        </div> }



{/***************************  Job Status Quoting ******************************888*/}
  

  </div>
//   end job form
  ); 
//   end return
}  
// end function

export default JobFormCustomer;
