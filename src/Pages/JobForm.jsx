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
  const [isChecked, setChecked] = useState(false);
  const [maximumDemand, setMaximumDemand] = useState("");
  const [consumerMains, setConsumerMains] = useState("");

  const [ectricalRetailer, setEctricalRetailer] = useState("");
  const [ergyDistributor, setErgyDistributor] = useState("");
  const [phasesMains, setPhasesMains] = useState("");
  const [jobStatus, setJobStatus] = useState("Draft");
    // This state determines whether the form is visible or not

    const [startDate, setStartDate] = useState("");
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState(false);
    const [completionDate, setCompletionDate] = useState("");




  const [isFormVisible, setIsFormVisible] = useState(true)
  let location = useLocation();
  let status = location.state.status;
  let navigate = useNavigate();



  const getJobStatusNumber = (status) => {
    switch(status) {
      case "Draft": return 1;
      case "Quoting": return 2;
      case "Customer Approval": return 3;
      case "Worker Assignment": return 4;
      case "Job Implementation": return 5;
      case "Customer Review": return 6;
      default: return -1;
    }
  }

  const incrementJobStatus = () => {
    const currentStatusNumber = getJobStatusNumber(jobStatus);
    if (currentStatusNumber === -1 || currentStatusNumber === 6) return; // If status is not recognized or it's already the last status, do nothing

    const statusList = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review"];
    setJobStatus(statusList[currentStatusNumber]); // Update the status to the next one
  }

  const decrementJobStatus = () => {
    const currentStatusNumber = getJobStatusNumber(jobStatus);
    if (currentStatusNumber <= 1) return;

    const previousStatusNumber = currentStatusNumber - 2;
    const statusList = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review"];

    setJobStatus(statusList[previousStatusNumber]);
  }



  const handleOnChange = () => {
    setChecked(!isChecked);
    // for tickbox worker , job complies
  }
  const handleClose = () => {
    navigate('/home',{ state: { status } });
    // Close and save changes
    

    // console.log('loginpage' + {status})
  };
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };


// Accept quote from customer
  const handleAccept = () => {
    
    // forward status one step
    incrementJobStatus();
      // go back to home view of role who edited the form
      navigate('/home',{ state: { status } });
    alert("TODO");
    // console.log('loginpage' + {status})
  };

// Reject quote from customer
  const handleReject = () => {
    // alert("TODO");
    
    // reduce status one step
    decrementJobStatus();
   
    // go back to home view of role who edited the form
    navigate('/home',{ state: { status } });
    // console.log('loginpage' + {status})
  };

  const handleSubmit = () => {
    // alert("TODO");
    
    // forward status one step
    incrementJobStatus();
       // save changes to document of Jobs collection,
    // worker can only submit if tickbox is set
    // go back to home view of role who edited the form
    if (status === "Worker") {
      if (isChecked) {
        navigate('/home', { state: { status } });
      } else {
        alert("Compliance box must be checked first");
      }
    } else {
      navigate('/home', { state: { status } });
    }
    // console.log('loginpage' + {status})
  };

 

  const handleSave = () => {
    alert("TODO");
    // save changes to document of Jobs coolection, keep status
  
    // console.log('loginpage' + {status})
  };
  

  const handleAssignWorker = () => {
    navigate('/managerWorkers',{ state: { status } });
    // console.log('loginpage' + {status})
  };
  const handleAcceptJob = () => {
    // worker accepts job
    navigate('/home',{ state: { status } });
    // console.log('loginpage' + {status})
  };

  const handleRejectJob = () => {
    // worker recects job
    navigate('/home',{ state: { status } });
    // Go back to previous process step
    decrementJobStatus();
    // go back to home view of worker
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


</div>
{/* this form will always displayed but when Job status is not Draft, the fields will be grayed out */}
      
{/***************************  Job Status DRAFT ******************************888*/}






       
        

   {/***************************  Job Status  Customer Approval ******************************888*/}    
   <div className="job-form"> 
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
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Job Implementation</p>
          < div className="form-row">
          <button disabled={jobStatus !== "Job Implementation"} onClick={handleAcceptJob}>Accept Job</button>
          <button disabled={jobStatus !== "Job Implementation"} onClick={handleRejectJob}>Reject Job</button>
          </div>
         
         < div className="form-row">
          <input type="maximumDemand" value={maximumDemand} onChange={e => setMaximumDemand(e.target.value)} placeholder="Maximum Demand in Amp" disabled={jobStatus !== "Job Implementation"} />
          <input type="consumerMains" value={consumerMains} onChange={e => setConsumerMains(e.target.value)} placeholder="Consumer Mains" disabled={jobStatus !== "Job Implementation"} />
          </div>

          < div className="form-row">
          <input type="ectricalRetailer" value={ectricalRetailer} onChange={e => setEctricalRetailer(e.target.value)} placeholder="Electrical Retailer" disabled={jobStatus !== "Job Implementation"} />
          <input type="ergyDistributor" value={ergyDistributor} onChange={e => setErgyDistributor(e.target.value)} placeholder="Energy Distributor" disabled={jobStatus !== "Job Implementation"} />
          </div>
          < div className="form-row">
          <input type="phasesMains" value={phasesMains} onChange={e => setPhasesMains(e.target.value)} placeholder="Phases Mains" disabled={jobStatus !== "Job Implementation"} />
          </div>
          <input type="checkbox"checked={isChecked}onChange={handleOnChange}disabled={jobStatus !== "Job Implementation"}/>
          <label>I, the electrical worker certify that the electrical installation work above complies to the electrical safety standards</label>
        

        
        </div>}
{/***************************  Job Customer Review ******************************888*/}
        {jobStatus === "Customer Review" &&
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          
          < div className="form-row">
          <p>Date work started</p>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Start Date" disabled={jobStatus !== "Customer Review"} />
          </div>
          < div className="form-row">
          <p>Please rate your work</p>
          <select value={reviewStars} onChange={e => setReviewStars(e.target.value)}>
              {/* <option value="">JobStatus</option> */}
              <option value="1 Star" >1 Star</option>
              <option value="2 Star">2 Star</option>
              <option value="3 Star">3 Star</option>
              <option value="4 Star">4 Star</option>
              <option value="5 Star">5 Star</option>
              
          </select>
          </div>

          <p>Review</p> 
            <div className="form-row">
            <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Please write a review" disabled={jobStatus !== "Customer Review"} />
            </div>


          < div className="form-row">
          <p>Date work completed</p>
          <input type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} placeholder= "Completion Date" disabled={jobStatus !== "Customer Review"} />
          </div>
        </div>}

        {jobStatus === "Customer Approval"? (
          <div>
            <button onClick={handleAccept}>Accept Quote</button> 
            <button onClick={handleReject}>Reject Quote</button>  
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
