import React, { useState, useEffect} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import JobFormCustomer from '../components/JobFormCustomer';
import {  useLocation, useNavigate, useParams} from 'react-router-dom';
// import { useLocalStorage } from 'react-use';

function JobForm() {
  const { id } = useParams();  // Get the job _id from the URL parameters
  const [licenseNr, setLicenseNr] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [maximumDemand, setMaximumDemand] = useState("");
  const [consumerMains, setConsumerMains] = useState("");

  const [ectricalRetailer, setEctricalRetailer] = useState("");
  const [ergyDistributor, setErgyDistributor] = useState("");
  const [phasesMains, setPhasesMains] = useState("");
  // const [jobStatus, setJobStatus] = useState("Draft");
    // This state determines whether the form is visible or not

    const [startDate, setStartDate] = useState("");
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    // const [userMessage, setUserMessage] = useState(" No Messages");
    


  const [isFormVisible, setIsFormVisible] = useState(true)
  let location = useLocation();
  let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  // let userMessage = location.state.userMessage;


    // Local storage is an object, and every piece of data is assigned to a key on that object.
    // So, we must specify what key that is and what data we use if no key is found in local storage.
    // const [storedName, setStoredName] = useLocalStorage("TheName", "");
    // benefit: rerenders when value change
  // const [userMessage, setUserMessage] = useState(localStorage.getItem('userMessage') || "No Messages");
  const [userMessage] = useState(localStorage.getItem('userMessage') || "No Messages");

  const jobStatuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review"];

  const [jobStatus, setJobStatus] = useState(localStorage.getItem('jobStatus') || "Draft");

    console.log('id: '  + id)

  useEffect(() => {
    localStorage.setItem('userMessage', userMessage);
  }, [userMessage]);

 
  // localStorage.setItem('jobStatus', "Draft");
  





  const incrementJobStatus = () => {
    const currentIndex = jobStatuses.indexOf(jobStatus);
    if (currentIndex < jobStatuses.length - 1) {
      const newStatus = jobStatuses[currentIndex + 1];
      setJobStatus(newStatus);
      localStorage.setItem('jobStatus', newStatus);
    } else {

      console.log("Job status is already at the final state");
      // setJobStatus("Draft");
     
    }
  };


  
  // alert('new job status' + {jobStatus});
  // const decrementJobStatus = () => {
  //   const currentStatusNumber = getJobStatusNumber(jobStatus);
  //   if (currentStatusNumber <= 1) return;

  //   const previousStatusNumber = currentStatusNumber - 2;
  //   const statusList = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review"];

  //   setJobStatus(statusList[previousStatusNumber -1]);
  // }

  const decrementJobStatus = () => {
    const currentIndex = jobStatuses.indexOf(jobStatus);
    if (currentIndex > 0) {
      const newStatus = jobStatuses[currentIndex - 1];
      setJobStatus(newStatus);
      localStorage.setItem('jobStatus', newStatus);
    } else {
      console.log("Job status is already at the initial state");
    }
  };

  const handleOnChange = () => {
    setChecked(!isChecked);
    // for tickbox worker , job complies
  }
  const handleClose = () => {
    navigate('/home',{ state: { userStatus } });
    // Close and save changes
    

    // console.log('loginpage' + {userStatus})
  };
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };


// Accept quote from customer
  const handleAccept = () => {
    // send email or message to manager: "your quote was accepted by sustomer"
    // forward status one step
    incrementJobStatus();
    console.log('handle Accept next status' + jobStatus)
      // go back to home view of role who edited the form
      navigate('/home',{ state: { userStatus } });
    // alert("TODO");
    // console.log('loginpage' + {status})
    
  };

// Reject quote from customer
  const handleReject = () => {
    // alert("TODO");
    // send email or message to manager: "your quote was rejected by sustomer"
    // reduce status one step
    decrementJobStatus();
   
    // go back to home view of role who edited the form
    navigate('/home',{ state: { userStatus } });
    // console.log('loginpage' + {status})
  };

  const handleSubmit = () => {
    if (jobStatus === "Draft") {
      //if (userStatus === "Customer" && jobStatus === "Draft") {
      // sendEmail('manager@example.com', 'New Quote Request', 'A new quote request has arrived');
      localStorage.setItem('userMessage', "To Manager: a new quote request has arrived");
      // setUserMessage("To Manager: a new quote request has arrived");
      // incrementJobStatus();
    } else if (jobStatus === "Quoting") {
      //} else if (userStatus === "Manager" && jobStatus === "Quoting") {
      // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      localStorage.setItem('userMessage', "To Customer: your quote has arrived");
      // setUserMessage("To Customer: your quote has arrived");
      // incrementJobStatus();
    } else if (jobStatus === "Customer Approval") {
      //} else if (userStatus === "Manager" && jobStatus === "Quoting") {
      // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      localStorage.setItem('userMessage', "To Manager: your quote was approved");
      //setUserMessage("To Manager: your quote was approved");
      // incrementJobStatus();
    } else if (jobStatus === "Worker Assignment") {
      //} else if (userStatus === "Manager" && jobStatus === "Worker Assignment") {
      // sendEmail('worker@example.com', 'New Job Assignment', 'You have a new job');
      localStorage.setItem('userMessage', "To Worker: you have a new job");
      // setUserMessage("To Worker: you have a new job");
      // incrementJobStatus();
    } else if (jobStatus === "Job Implementation") {
      //} else if (userStatus === "Worker" && jobStatus === "Job Implementation") {
      if (isChecked) {
        // alert("isChecked = true");
        // sendEmail('manager@example.com', 'Job Completed', 'Your job has been completed');
        // localStorage.setItem('userMessage', "To Manager: your job has been completed");
        localStorage.setItem('userMessage', "To Customer: your job has been completed, please leave a review");
        // setUserMessage("To Manager: your job has been completed");
        // setUserMessage("To Customer: your job has been completed, please leave a review");
        // incrementJobStatus();
      } else {
        localStorage.setItem('userMessage', "To Worker: Compliance box must be checked first");
        // setUserMessage("To Worker: Compliance box must be checked first");
        alert("Compliance box must be checked first");
        return;
      }
    } else if (jobStatus === "Customer Review") {
      //} else if (userStatus === "Customer" && jobStatus === "Customer Review") {
      // sendEmail('manager@example.com', 'New Review', 'A new review has arrived');
      // localStorage.setItem('userMessage', "To Manager: a new review has arrived");
      // setUserMessage("To Manager: a new review has arrived");
      localStorage.setItem('jobStatus', "Draft");
      localStorage.setItem('userMessage', "no messages");
      navigate('/home', { state: { userStatus } });
      return;
    }
    incrementJobStatus();
    navigate('/home', { state: { userStatus } });
    
  };
  

 

  const handleSave = () => {
    alert("TODO");
    // save changes to document of Jobs coolection, keep job status
  
    // console.log('loginpage' + {userStatus})
  };
  

  const handleAssignWorker = () => {
    navigate('/managerWorkers',{ state: { userStatus } });
    // console.log('loginpage' + {userStatus})
  };
  const handleAcceptJob = () => {
    // worker accepts job
    // send email or message to manager: "assigned worker accepted the job"
    navigate('/home',{ state: { userStatus } });
    // console.log('loginpage' + {userStatus})
  };

  const handleRejectJob = () => {
    // worker recects job
    // send email or message to manager: "assigned worker recected the job"
    navigate('/home',{ state: { userStatus } });
    // Go back to previous process step
    decrementJobStatus();
    // go back to home view of worker
    // console.log('loginpage' + {status})
  };
  
  console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      {/* <select value={jobStatus} onChange={e => setJobStatus(e.target.value)}>
              
              <option value="Draft" >Draft</option>
              <option value="Quoting">Quoting</option>
              <option value="Customer Approval">Customer Approval</option>
              <option value="Worker Assignment">Worker Assignment</option>
              <option value="Job Implementation">Job Implementation</option>
              <option value="Customer Review">Customer Review</option>
          </select> */}


<div className="job-form-and-side-panel">
<div className="job-form">
    <div className="job-form">
        <h2>Job Profile</h2>
        <div className="form-row">
        <p>User status: {userStatus}</p>
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
      {/* end div sub job form */}
      </div>
      {/* Show side pannel */}
      <Side userMessage = {userMessage} />
      </div>  {/* "job-form-and-side-panel" */}
      <Footer/> 
    </div>
  );
}

export default JobForm;
