import React, { useState, useEffect} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
// import JobFormCustomer from '../components/JobFormCustomer';
import {  useNavigate, useParams} from 'react-router-dom';
import {getJob,createJob} from "../services/jobsServices"
import { getLoggedInUser, getUser } from "../services/userServices";
import { getReview } from "../services/reviewsServices";
import {calculateVisibility} from "../services/visibilityManager";
// import { useLocalStorage } from 'react-use';

function JobForm() {
  const { jobId } = useParams();  // Get the job _id from the URL parameters, link from home
  // const jobStatus = localStorage.getItem('jobStatus');
  // from JobForm
  // const jobIdHome = localStorage.getItem('jobId');
  // to open the jobform and assign the worker
  
  
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [addressOfInstallation, setaddressOfInstallation] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [preferredJobCompletionDate, setpreferredJobCompletionDate] = useState("");
  const [quoted, setQuoted] = useState("");
  const [quoteAmmount, setQuoteAmmount] = useState("");
  const [quoteAttachment, setQuoteAttachment] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [workStarted, setWorkStarted] = useState("");
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
    const [reviewId, setReviewId] = useState("");
    const [reviewStars, setReviewStars] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true)
    // let location = useLocation();
    const userStatus = localStorage.getItem('userStatus');

    let navigate = useNavigate();
    const [userMessage] = useState(localStorage.getItem('userMessage') || "No Messages");
    const jobStatuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const [jobStatus, setJobStatus] = useState(localStorage.getItem('jobStatus') );
    // const [jobStatus, setJobStatus] = useState("");
    // const jobStatus = localStorage.getItem("jobStatus");Draft
    // const jobStatus= localStorage.getItem('userMessage');
    // const userMessage = localStorage.getItem('userMessage');
    const [visibility, setVisibility] = useState({quotingVisable: false, assignVisable: false, implementVisable: false, reviewVisable: false,});


    console.log('Jobid from JobForm: '  + jobId)
    // setuserMessage

  localStorage.setItem('userMessage', "It is a wonderfull day today");

  // **** logic of the form

  const incrementJobStatus = () => {
    const currentIndex = jobStatuses.indexOf(jobStatus);
    if (currentIndex < jobStatuses.length - 1) {
      const newStatus = jobStatuses[currentIndex + 1];
      setJobStatus(newStatus);
      localStorage.setItem('jobStatus', newStatus);
      console.log("jobStatus incremented, new status is: "+ newStatus);
    } else {

      console.log("Job status is already at the final state");
     setJobStatus("Draft");
     
    }
  };

  const decrementJobStatus = () => {
    const currentIndex = jobStatuses.indexOf(jobStatus);
    if (currentIndex > 0) {
      const newStatus = jobStatuses[currentIndex - 1];
      setJobStatus(newStatus);
      localStorage.setItem('jobStatus', newStatus);
      console.log("jobStatus decremented, new status is: "+ newStatus);
    } else {
      console.log("Job status is already at the initial state");
    }
  };

  const createNewJob = async () => {
    // to be copied to handleSubmit
    // Replace this with your actual function for creating a new job
    // if(jobId === 0){
// if this is a new job
console.log('create new jobstatus  ' + jobStatus)
   
    const jobData = {
      customerId,     // id of logged in user from local memory
      scopeOfWork,
      jobStatus,
      addressOfInstallation,
      preferredJobCompletionDate
      // here later job date raised by customer Not needed, created by server
    };
    console.log("jobData from create new job"  +  customerId,     // id of logged in user from local memory
    scopeOfWork,
    addressOfInstallation,
    preferredJobCompletionDate )



    try {
      const newJob = await createJob(jobData); // replace this with your API call
      console.log("New job created:", newJob);
    } catch (error) {
      console.error("Failed to create new job:", error );
    }
 
  };// end Create new job


useEffect(() => {
  // Fetch the job details when the component mounts
  // only when opened from joblist link
  // if lodged from start new job (jobId = 0): customer ID is from new user
  // jobStatus = draft
  // load jobdata
  localStorage.setItem('jobStatus', jobStatus)

// functions to fill in form with user data customerId either from job DB (fetchJob ) or from logged in user:
  const fetchUser = async (customerId) => {
    try {
      const userData = await getUser(customerId);
      console.log('userData from fetch user:', userData);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setPhone(userData.contactNumber);
      setEmail(userData.email);
      setAddress(userData.address); // add this line to update user data once it's fetched
    } catch (error) {
      console.error('Failed to fetch data from logged in customer:', error);
    }
  };
  const fetchWorker = async (workerId) => {
    try {
      const workerData = await getUser(workerId);
      console.log('workerData from fetch user:', workerData);
      if (workerData.hasOwnProperty('message404')){
        setLicenseNr('not assigned');
        setWorkerName('not assigned');

      }else{
        setLicenseNr(workerData.licenseNo);
        setWorkerName(workerData.firstName + ' ' + workerData.lastName);
      }
      
      
    } catch (error) {
      console.error('Failed to fetch data from worker ID', error);
    }
  };

  const fetchReview = async (reviewId) => {
    try {
      const reviewData = await getReview(reviewId);
      console.log('review from fetch review:', reviewData);
      if (reviewData.hasOwnProperty('message404')){
        setReview('no review yet')

      }else{
        setReviewStars(reviewData.stars);
        setReview(reviewData.review );
        setCompletionDate(reviewData.endDate );

      }
  
      
    } catch (error) {
      console.error('Failed to fetch data from review ID:', error);
    }
  };
// this runs when job is selected from form (new Job). fetch all values, render form according to status
  const fetchJob = async () => {
    try {
      const jobData = await getJob(jobId);
      console.log("(job.jobStatus)  "  + jobStatus);
      console.log('Job data:', jobData);
      // setJob(jobData);
      setCustomerId(jobData.customerId);
      setJobStatus(jobData.jobStatus);
      setaddressOfInstallation(jobData.addressOfInstallation);
      setScopeOfWork(jobData.scopeOfWork);
      setpreferredJobCompletionDate(formatDate(jobData.preferredJobCompletionDate));
      setDateCreated(formatDate(jobData.dateCreated));
      setQuoted(formatDate(jobData.dateQuoted));
      setQuoteAmmount(jobData.amountQuoted);
      setQuoteAttachment(jobData.quoteAttachment);
      setWorkerId(jobData.workerId);
      setWorkStarted(formatDate(jobData.workerkStarted));
      setMaximumDemand(jobData.maximumDemandInAmps);
      setConsumerMains(jobData.consumerMainsCapacity);
      setEctricalRetailer(jobData.ectricalRetailer);
      setErgyDistributor(jobData.energyDistributor);
      setPhasesMains(jobData.mainsPhases);
      setReviewId(jobData.reviewId);
      // setDateQ
      // set

      // Fetch user data after job data is successfully fetched
      fetchUser(jobData.customerId);

      
      if (visibility.assignVisable) {
        fetchWorker(jobData.workerId);
      }
      if (visibility.reviewVisable) {
        fetchReview(jobData.reviewId);
      }
    } catch (error) {
      console.error('Failed to fetch job:', error);
    }
  };

  console.log('visibility.assignVisable' + visibility.assignVisable)
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

  if (jobId !== 'New') {
    fetchJob();  // get jobdata from server if new job
    // console.log('preferredJobComplDraftetionDate '  + preferredJobCompletionDate)
  } // endif jobID




}, [jobId, jobStatus,visibility]);  // end use effect



useEffect(() => {
  if(jobStatus && userStatus) {
    const visibilityResult = calculateVisibility(jobStatus, userStatus);
    setVisibility(visibilityResult);
  }
}, [jobStatus, userStatus]);
// The fetchUser function as its own standalone function
// if new job 
// const fetchUser = async () => {
//   try {
//     const userData = await getLoggedInUser();
//     console.log('userData from fetch user:', userData);
//     setFirstName(userData.firstName);
//   setLastName(userData.lastName);
//   setPhone(userData.contactNumber);
//   setEmail(userData.email);
//   setAddress(userData.address); // add this line to update user data once it's fetched
//   } catch (error) {
//     console.error('Failed to fetch dataform logged in customer:', error);
//   }
// };

// *** create new job buttton

// when job is selected from form: 
// fetch job data via jobID
// fetch


const  copyUserData = async() => {
  // copy data from customer profile profile click
  try {
    const userData = await getLoggedInUser();
    console.log('userData from fetch user:', userData);
    setFirstName(userData.firstName);
  setLastName(userData.lastName);
  setPhone(userData.contactNumber);
  setEmail(userData.email);
  setAddress(userData.address); 
  setDateCreated(userData.dateCreated);
  } catch (error) {
    console.error('Failed to fetch dataform logged in customer:', error);
  }
  
      // alert("TODO");
      // console.log('loginpage' + {status})
    };
  
    const handleCustomerData = () => {
      // copy customer address to job address
      setaddressOfInstallation(address)
      // alert("TODO");
      // console.log('loginpage' + {status})
    };


  const handleOnChange = () => {
    setChecked(!isChecked);
    // for tickbox worker , job complies
  }




  const handleClose = () => {
    navigate('/home',{ state: { userStatus } });
    // Close and save changes, don't increase status
    

    // console.log('loginpage' + {userStatus})
  };

  const toggleForm = () => {
    // toggle customer data 
    setIsFormVisible(!isFormVisible);
  };


// Accept quote from customer
  const handleAccept = () => {
    // send email or message to manager: "your quote was accepted by sustomer"
    // forward status one step
    incrementJobStatus();
// update job with new status

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
    // reduce status back to quoting
    decrementJobStatus();
   // update job with new status
    // go back to home view of role who edited the form
    navigate('/home',{ state: { userStatus } });
    // console.log('loginpage' + {status})
  };
// *** for handle submit



  const handleSubmit = async () => {
    console.log('handleSubmit jobstat  ' + jobStatus)
    if (jobStatus === "Draft") {

      // if Job ID === 0 , create job with form data




      //if (userStatus === "Customer" && jobStatus === "Draft") {
      // sendEmail('manager@example.com', 'New Quote Request', 'A new quote request has arrived');
      // localStorage.setItem('userMessage', "To Manager: a new quote request has arrived");
      // setUserMessage("To Manager: a new quote request has arrived");
      incrementJobStatus();
    } else if (jobStatus === "Quoting") {
      // update job with form data
      //} else if (userStatus === "Manager" && jobStatus === "Quoting") {
      // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      // localStorage.setItem('userMessage', "To Customer: your quote has arrived");
      // setUserMessage("To Customer: your quote has arrived");
      // incrementJobStatus();
    } else if (jobStatus === "Customer Approval") {
      // update job with form data
      //} else if (userStatus === "Manager" && jobStatus === "Quoting") {
      // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      // localStorage.setItem('userMessage', "To Manager: your quote was approved");
      //setUserMessage("To Manager: your quote was approved");
      // incrementJobStatus();
    } else if (jobStatus === "Worker Assignment") {
      //} else if (userStatus === "Manager" && jobStatus === "Worker Assignment") {
      // sendEmail('worker@example.com', 'New Job Assignment', 'You have a new job');
      // localStorage.setItem('userMessage', "To Worker: you have a new job");
      // setUserMessage("To Worker: you have a new job");
      // incrementJobStatus();
    } else if (jobStatus === "Job Implementation") {
      //} else if (userStatus === "Worker" && jobStatus === "Job Implementation") {
      if (isChecked) {
        // alert("isChecked = true");
        // sendEmail('manager@example.com', 'Job Completed', 'Your job has been completed');
        // localStorage.setItem('userMessage', "To Manager: your job has been completed");
        // localStorage.setItem('userMessage', "To Customer: your job has been completed, please leave a review");
        // setUserMessage("To Manager: your job has been completed");
        // setUserMessage("To Customer: your job has been completed, please leave a review");
        // incrementJobStatus();
      } else {
        // localStorage.setItem('userMessage', "To Worker: Compliance box must be checked first");
        // setUserMessage("To Worker: Compliance box must be checked first");
        alert("Compliance box must be checked first");
        return;
      }
    } else if (jobStatus === "Customer Review") {
      //} else if (userStatus === "Customer" && jobStatus === "Customer Review") {
      // sendEmail('manager@example.com', 'New Review', 'A new review has arrived');
      // localStorage.setItem('userMessage', "To Manager: a new review has arrived");
      // setUserMessage("To Manager: a new review has arrived");

      // create new review,  review ID from response just created review

      // localStorage.setItem('jobStatus', "Closed");
      // localStorage.setItem('userMessage', "no messages");
      // navigate('/home', { state: { userStatus } });
      return;
    }
    // allways increment, gets decremented when customer rejects quote or worker rejects job
    // incrementJobStatus();
    // incrementJobStatus();
    // localStorage.setItem('jobStatus', 'Quoting');
    console.log('handle Submit next status  ' + jobStatus)
    if (jobId === 'New'){
      // setJobStatus("Quoting")
      createNewJob();
    }else{

        //  update job with form data
    }
    



    navigate('/home', { state: { userStatus } });
    
  };
  

 

  // const handleSave = () => {
  //   alert("TODO");

  //   // if job ID === 0 create new job with available data
  //   // else
  //   // save changes to document of Jobs coolection, keep job status
  
  //   // console.log('loginpage' + {userStatus})
  // };
  

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
  
  // console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      


<div className="job-form-and-side-panel">
<div className="job-form">
    {/* <div className="job-form"> */}
        <h2>Job Profile</h2>
        <div className="form-row">
        <p>User status: {userStatus}</p>
        <p>Job status: {jobStatus}</p>
        </div>
    {/* </div> */}
{/***************************  Job Status DRAFT ******************************888*/}

  <button onClick={toggleForm}>Toggle Customer data</button>
      {isFormVisible && (
        <div className="job-form">
          {/* <JobFormCustomer jobStatus = {jobStatus}  jobId = {jobId}/>
        </div>
      )}  */}
      {/* end isFormVisible */}



   
   {/* <div className="job-form">  */}

{/* this form will always displayed but when Job status is not Draft, the fields will be grayed out */}
      
{/***************************  Job Status DRAFT ******************************888*/}

<div className="form-row">
            {/*allways be displayed  */}
          <p>Customer Details:</p> 
          <button disabled={jobStatus !== "Draft"} onClick={copyUserData}>Copy from profile</button>
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
      )} 

   {/*************************** End Job Status DRAFT ******************************888*/}         
{/***************************  Job Status Quoting ******************************888*/}
{(visibility.quotingVisable)&& <div className="job-form">
      <div className="form-row">
        <p>Date Created by customer:    {dateCreated} </p>
    
        {/* <input className="date-input" type="date" value={preferredJobCompletionDate} onChange={e => setpreferredJobCompletionDate(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} /> */}
    
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

{/***************************  end Job Status Quoting ******************************888*/}


   {/***************************  Job Status  Customer Approval ******************************888*/} 

         {jobStatus === "Customer Approval" &&
         <div>
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>For approval please confirm Clicking ACCEPT</p>
        </div>}
{/***************************  Job Status Worker Assignment******************************888*/}
        {(visibility.assignVisable) &&
          <div className="job-form">
            <p>Your Electrical Worker </p>
          <div className="form-row">
          
          <input type="licenseNr" value={licenseNr} onChange={e => setLicenseNr(e.target.value)} placeholder="License Number" disabled={jobStatus !== "Worker Assignment"} />
          <input type="workerName" value={workerName} onChange={e => setWorkerName(e.target.value)} placeholder="Worker Name" disabled={jobStatus !== "Worker Assignment"} />
          <button disabled={jobStatus !== "Worker Assignment"} onClick={handleAssignWorker}>Assign Electrical Worker</button>
          </div>
          </div>}
{/***************************  Job Status Job Implementation ******************************888*/}
        {visibility.implementVisable &&
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Job Implementation</p>
          
          <div className="form-row">
          <button disabled={jobStatus !== "Job Implementation"} onClick={handleAcceptJob}>Accept Job</button>
          <button disabled={jobStatus !== "Job Implementation"} onClick={handleRejectJob}>Reject Job</button>
          </div>
         
         <div className="form-row">
          <input type="maximumDemand" value={maximumDemand} onChange={e => setMaximumDemand(e.target.value)} placeholder="Maximum Demand in Amp" disabled={jobStatus !== "Job Implementation"} />
          <input type="consumerMains" value={consumerMains} onChange={e => setConsumerMains(e.target.value)} placeholder="Consumer Mains" disabled={jobStatus !== "Job Implementation"} />
          </div>

          <div className="form-row">
          <input type="ectricalRetailer" value={ectricalRetailer} onChange={e => setEctricalRetailer(e.target.value)} placeholder="Electrical Retailer" disabled={jobStatus !== "Job Implementation"} />
          <input type="ergyDistributor" value={ergyDistributor} onChange={e => setErgyDistributor(e.target.value)} placeholder="Energy Distributor" disabled={jobStatus !== "Job Implementation"} />
          </div>

          <div className="form-row">
          <input type="phasesMains" value={phasesMains} onChange={e => setPhasesMains(e.target.value)} placeholder="Phases Mains" disabled={jobStatus !== "Job Implementation"} />
          </div>

          <input type="checkbox"checked={isChecked}onChange={handleOnChange}disabled={jobStatus !== "Job Implementation"}/>
          <label>I, the electrical worker certify that the electrical installation work above complies to the electrical safety standards</label>
        

        
        </div>}
{/***************************  Job Customer Review ******************************888*/}
        {(visibility.reviewVisable) &&
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          
          <div className="form-row">
          <p>Date work started</p>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Start Date" disabled={jobStatus !== "Customer Review"} />
          </div>
          <div className="form-row">
          <p>Please rate your work</p>
          <select value={reviewStars} onChange={e => setReviewStars(e.target.value)}disabled={(jobStatus !== "Customer Review"|| userStatus === "manager")} >
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
            <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Please write a review" disabled={(jobStatus !== "Customer Review"|| userStatus === "manager")} />
            </div>


          <div className="form-row">
          <p>Date work completed</p>
          <input type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} placeholder= "Completion Date" disabled={jobStatus !== "Customer Review"} />
          </div>
        </div>}
        {/* end job form */}

        {jobStatus === "Customer Approval"? (
          <div>
            <button onClick={handleAccept}>Accept Quote</button> 
            <button onClick={handleReject}>Reject Quote</button>  
            <button onClick={handleClose}>Close</button>
        </div>
        ) : (
          <div>
            <button onClick={handleSubmit}>Submit</button> 
            {/* <button onClick={handleSave}>Save</button>  */}
            <button onClick={handleClose}>Close</button>
             
        </div>
        )}  
        {/* end Job Status */}
           
      {/* </div>   */}
      {/* end div sub job form */}
      </div>
      {/* Show side pannel */}
      <Side userMessage = {userMessage} />
      </div>  {/* "job-form-and-side-panel" */}
      <Footer/> 
    </div>  
    // end app
  );
}

export default JobForm;
