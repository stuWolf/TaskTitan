import React, { useState, useEffect} from "react";
import '../App.css';

import { getLoggedInUser } from "../services/userServices";
import {createJob} from "../services/jobsServices"

function JobFormCustomer({jobStatus,  jobId}) {


  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [addressOfInstallation, setaddressOfInstallation] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [preferredJobCompletionDate, setpreferredJobCompletionDate] = useState("");
  const [quoted, setQuoted] = useState("");
  const [quoteAmmount, setQuoteAmmount] = useState("");
  const customerId = localStorage.getItem('userId');





useEffect(() => {
    // Return a cleanup function that will be run when the component is unmounted
    return () => {

      createNewJob();

      
    };
}, []);

// The fetchUser function as its own standalone function
const fetchUser = async () => {
  try {
    const userData = await getLoggedInUser();
    console.log('userData from fetch user:', userData);
    handleProfile(userData); // add this line to update user data once it's fetched
  } catch (error) {
    console.error('Failed to fetch user in job form customer:', error);
  }
};

// You'll handle user data inside this function
const handleProfile = (userData) => {
  setFirstName(userData.firstName);
  setLastName(userData.lastName);
  setPhone(userData.contactNumber);
  setEmail(userData.email);
  setAddress(userData.address);
};




  const  onButtonClick = () => {
// copy from profile clicked
    fetchUser();

    // alert("TODO");
    // console.log('loginpage' + {status})
  };

  const handleCustomerData = () => {
    setaddressOfInstallation(address)
    // alert("TODO");
    // console.log('loginpage' + {status})
  };

  console.log("jobData from create new job"  +  customerId, jobStatus,    // id of logged in user from local memory
  scopeOfWork,
  addressOfInstallation,
  preferredJobCompletionDate )
  const createNewJob = async () => {
    // Replace this with your actual function for creating a new job
    // if(jobId === 0){
// if this is a new job

   
    const jobData = {
      customerId,     // id of logged in user from local memory
      scopeOfWork,
      jobStatus,
      addressOfInstallation,
      preferredJobCompletionDate
      // here later job date raised by customer
    };
    console.log("jobData from create new job"  +  customerId,     // id of logged in user from local memory
    scopeOfWork,
    addressOfInstallation,
    preferredJobCompletionDate )
// console.log("customerId from create new job  "  + customerId)
    try {
      const newJob = await createJob(jobData); // replace this with your API call
      console.log("New job created:", newJob);
    } catch (error) {
      console.error("Failed to create new job:", error );
    }
  // } // end if jobId
  };
  

//   console.log('home  ' + status)
  return (


    <div className="App">
      
   
{/***************************  Job Status DRAFT ******************************888*/}

<div className="job-form">
       

          <div className="form-row">
            {/*allways be displayed  */}
          <p>Customer Details:</p> 
          <button disabled={jobStatus !== "Draft"} onClick={onButtonClick}>Copy from profile</button>
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


        <div className="form-row" >
            <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" disabled={jobStatus !== "Draft"} />
            </div>
            
            <div className="form-row">
          
            <input type="addressOfInstallation" value={addressOfInstallation} onChange={e => setaddressOfInstallation(e.target.value)} placeholder="InstallationAddress" disabled={jobStatus !== "Draft"} />
            <button disabled={jobStatus !== "Draft"} onClick={handleCustomerData}>Copy from Customer</button>
        </div>
      
        <p>Scope of Work:</p> 
            <div className="form-row">
            <textarea value={scopeOfWork} onChange={e => setScopeOfWork(e.target.value)} placeholder="Scope of Work" disabled={jobStatus !== "Draft"} />
            </div>
            
            <div className="form-row">
            <p>Prefered completion date:</p> 
            <input type="date" value={preferredJobCompletionDate} onChange={e => setpreferredJobCompletionDate(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} />
            </div>


        </div>

      {/***************************  Job Status Quoting ******************************888*/}

      {(jobStatus === "Quoting" || jobStatus === "Customer Approval")&& <div className="job-form">
      <div className="form-row">
        <p>Date Created by customer: </p>
    
        <input className="date-input" type="date" value={preferredJobCompletionDate} onChange={e => setpreferredJobCompletionDate(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} />
    
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
