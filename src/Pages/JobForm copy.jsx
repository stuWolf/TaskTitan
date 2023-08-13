import React, { useState, useEffect} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
// import JobFormCustomer from '../components/JobFormCustomer';
import {  useNavigate,useParams} from 'react-router-dom';
import {getJob,createJob, updateJob} from "../services/jobsServices"
import {  getUser } from "../services/userServices";
import { getReview } from "../services/reviewsServices";
import {calculateVisibility} from "../services/visibilityManager";
import {calculateEditability} from "../services/editManager";

// import { useLocalStorage } from 'react-use';


  
  function JobForm() {
    
   
const { jobId } = useParams();
   
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [addressOfInstallation, setaddressOfInstallation] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [preferredJobCompletionDate, setpreferredJobCompletionDate] = useState("");
  const [dateQuoted, setDateQuoted] = useState("");
  const [amountQuoted, setQuoteAmmount] = useState("");
  const [quoteAttachment, setQuoteAttachment] = useState("");
  const [customerId, setCustomerId] = useState("");
  // const [workerId, setWorkerId] = useState("");
  // const [workStarted, setWorkStarted] = useState("");
  const [licenseNr, setLicenseNr] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [maximumDemandInAmps, setMaximumDemandInAmps] = useState("");
  const [consumerMainsCapacity, setConsumerMains] = useState("");

  const [electricalRetailer, setEctricalRetailer] = useState("");
  const [energyDistributor, setErgyDistributor] = useState("");
  const [mainsPhases, setPhasesMains] = useState("");
  // const [jobStatus, setJobStatus] = useState("Draft");
    // This state determines whether the form is visible or not
  // const [errorMessage, setErrorMessage] = useState("");

 
    // const[dateCompleted, setDateCompleted]= useState("");
    const [startDate, setStartDate] = useState("");
    const [review, setReview] = useState("");
    const [reviewId, setReviewId] = useState("");
    const [reviewStars, setReviewStars] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true)  // foor toggle user data
    // let location = useLocation();
    const userStatus = localStorage.getItem('userStatus');

    let navigate = useNavigate();
    const [userMessage, setUserMessage] = useState(localStorage.getItem('userMessage') || "No Messages");
    const jobStatuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    // const [jobStatus, setJobStatus] = useState (localStorage.getItem('jobStatus') );  // initialises jobStatus with what's in local storage
    const [jobStatus, setJobStatus] = useState("Draft");
    // const jobStatus = localStorage.getItem("jobStatus");Draft
    // const jobStatus= localStorage.getItem('userMessage');
    // const userMessage = localStorage.getItem('userMessage');
    const [visibility, setVisibility] = useState({quotingVisable: false, assignVisable: false, implementVisable: false, reviewVisable: false,});
    const [editability, setEditability] = useState("");
    const userId = localStorage.getItem('userId');
    // console.log('Jobid from JobForm: '  + jobId)
    // setuserMessage

  localStorage.setItem('userMessage', "It is a wonderfull day today");

  // **** logic of the form

  const fetchWorker = async (workerId) => {
    // fetch name and license no from worker ID and write them into form variables
    try {
      const workerData = await getUser(workerId);
      console.log('workerid  '  + workerId)
      console.log('workerData from fetch Worker:', workerData);
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

  
useEffect(() => {
  // Fetch the job details when the component mounts
  // only when opened from joblist link
  // if lodged from start new job (jobId = 0): customer ID is from new user
  // jobStatus = draft
  // load jobdata
  // localStorage.setItem('jobStatus', jobStatus)

// functions to fill in form with user data customerId either from job DB (fetchJob ) or from logged in user:
  const fetchUser = async (customerId) => {
    try {
      const userData = await getUser(customerId);
      // console.log('userData from fetch user:', userData);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setPhone(userData.contactNumber);
      setEmail(userData.email);
      setAddress(userData.address); // add this line to update user data once it's fetched
      setDateCreated(userData.dateCreated);
    } catch (error) {
      console.error('Failed to fetch data from logged in customer:', error);
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
// this runs when job is selected from form . fetch all values, render form according to status
  const fetchJob = async () => {
    try {
      // console.log('fetch jobb called')
      const jobData = await getJob(jobId);
      // console.log("(job.jobStatus from fetch job)  "  + jobStatus);
      // console.log('Job data:', jobData);
      // setJob(jobData);
      setCustomerId(jobData.customerId);  // load existing job
      setJobStatus(jobData.jobStatus);
      setaddressOfInstallation(jobData.addressOfInstallation);
      setScopeOfWork(jobData.scopeOfWork);
      setpreferredJobCompletionDate(formatDate(jobData.preferredJobCompletionDate));
      setDateCreated(formatDate(jobData.dateCreated));
      setDateQuoted(formatDate(jobData.dateQuoted));
      setQuoteAmmount(jobData.amountQuoted);
      setQuoteAttachment(jobData.quoteAttachment);
      // setWorkerId(jobData.workerId);
      // setWorkStarted(formatDate(jobData.workStarted));
      setMaximumDemandInAmps(jobData.maximumDemandInAmps);
      setConsumerMains(jobData.consumerMainsCapacity);
      setEctricalRetailer(jobData.ectricalRetailer);
      setErgyDistributor(jobData.energyDistributor);
      setPhasesMains(jobData.mainsPhases);
      setReviewId(jobData.reviewId);
      setCompletionDate(jobData.setCompletionDate);
      // setDateQ
      // set

      // Fetch user data after job data is successfully fetched, update fields in header
      if(!email){

        fetchUser(jobData.customerId); 
      }
   

      
      if (visibility.implementVisable) {
        fetchWorker(jobData.workerId);
      }
      if (visibility.reviewVisable) {
        fetchReview(jobData.reviewId);
      }
    } catch (error) {
      console.error('Failed to fetch job:', error);
    }

   

  };

  // console.log('visibility.assignVisable' + visibility.assignVisable)



  if (jobId !== 'New') {
    fetchJob();  // get jobdata from server if existing job
    console.log('jobId'+  jobId+   'fetch jobb called')
    // console.log('preferredJobComplDraftetionDate '  + preferredJobCompletionDate)
  } else{
    setCustomerId(userId);
    console.log('jobId:  '+  jobId)
    setEditability (calculateEditability(jobStatus, userStatus, userId, customerId));

      fetchUser(userId); 
    
   
  }
  // console.log('userId  ' + userId + 'customerId  ' + customerId)
  



}, [jobStatus, userStatus,]);  // end use effect



useEffect(() => {
  
  if(jobStatus && userStatus) {
    const visibilityResult = calculateVisibility(jobStatus, userStatus);
    setVisibility(visibilityResult);
    // console.log('visibility' + visibility)
    // console.log('userId  ' + userId + 'customerId  ' + customerId)
    if(userId && customerId){
     
      setEditability (calculateEditability(jobStatus, userStatus, userId, customerId));
      
    }
  }

// copyUserData();

}, [jobStatus, userStatus, userId, customerId]);




  
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
    const newStatus = incrementJobStatus();
    console.log('handle Submit next status  ' + newStatus);
    const jobData = {
      jobStatus: newStatus
      
    };
    
    updateJobFormData(jobId, jobData);


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
   // save new status inn server
    // go back to home view of role who edited the form
    navigate('/home',{ state: { userStatus } });
    // console.log('loginpage' + {status})
  };
// *** for handle submit




const decrementJobStatus = () => {
  const currentIndex = jobStatuses.indexOf(jobStatus);
  if (currentIndex > 0) {
    const newStatus = jobStatuses[currentIndex - 1];
    setJobStatus(newStatus);
    // localStorage.setItem('jobStatus', newStatus);

   
    updateJobFormData(jobId, {jobStatus: newStatus}); 
    console.log("jobStatus decremented, new status is: "+ newStatus);
  } else {
    console.log("Job status is already at the initial state");
  }
};


const incrementJobStatus = () => {
  const currentIndex = jobStatuses.indexOf(jobStatus);
  if (currentIndex < jobStatuses.length - 1) {
    const newStatus = jobStatuses[currentIndex + 1];
    setJobStatus(newStatus);
    // localStorage.setItem('jobStatus', newStatus);
    console.log("jobStatus incremented, new status is: "+ newStatus);
    return newStatus
  } else {

    console.log("Job status is already at the final state");
   setJobStatus("Draft");
   return "Draft"
   
  }
};

const createNewJob = async (jobData) => {
  // to be copied to handleSubmit

  try {
    const newJob = await createJob(jobData); 
    console.log("New job created:", newJob);
  } catch (error) {
    console.error("Failed to create new job:", error );
  }

};// end Create new job

const updateJobFormData = async (jobId, jobData) => {
  // to be copied to handleSubmit
  
  // if(jobId === 0){
// if this is a new job
// console.log('create new jobstatus  ' + jobStatus)

  console.log('jobData from updateJobFormData    job:'+ jobId, 'customer:'+ customerId,
  jobStatus,     // id of logged in user from local memory
  scopeOfWork,
  addressOfInstallation,
  preferredJobCompletionDate )



  try {
    const newJob = await updateJob(jobId,jobData); 
    console.log("New job updated:", newJob);
  } catch (error) {
    console.error("Failed to update job:", error );
  }
  
};// end updateJobFormData 


  const handleSubmit = async () => {

    const today = new Date().toISOString();  // get today's date in ISO format
    // console.log('handleSubmit jobstat  ' + jobStatus)
    if (jobStatus === "Draft") {
      
      // const newStatus = incrementJobStatus();
      if (jobId === 'New'){
        
      const jobData = {
        jobStatus: incrementJobStatus(),
        customerId,     // id of logged in user from local memory
        scopeOfWork,
        addressOfInstallation,
        preferredJobCompletionDate,
        dateCreated: today  // today's date when submit Draft
        // here later job date raised by customer  -> Not needed, created by server
      };
// get job data from form and create new job
  // console.log('handle Submit next status  ' + newStatus);
    createNewJob(jobData);
    }else{
      const jobData = {
        jobStatus: incrementJobStatus()
      }
      updateJobFormData(jobId, jobData); // update with new status

    }
      //if (userStatus === "Customer" && jobStatus === "Draft") {
      // sendEmail('manager@example.com', 'New Quote Request', 'A new quote request has arrived');
      // localStorage.setItem('userMessage', "To Manager: a new quote request has arrived");
      setUserMessage("To Manager: a new quote request has arrived");
      // incrementJobStatus();
    } else if (jobStatus === "Quoting") {

      // const newStatus = incrementJobStatus();
      

      const jobData = {
  
        jobStatus: incrementJobStatus(),
        dateQuoted: today,   // today's date when manager submit quote
        amountQuoted,
        quoteAttachment
        
      };

      console.log('handle Submit next status  ' + jobData.jobStatus);

      updateJobFormData(jobId, jobData);
      

      // update job with form data
      //} else if (userStatus === "Manager" && jobStatus === "Quoting") {
      // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      // localStorage.setItem('userMessage', "To Customer: your quote has arrived");
      setUserMessage("To Customer: your quote has arrived");
      // incrementJobStatus();
    } else if (jobStatus === "Customer Approval") {
      //not needed, done in accept quote handler
      
      
        // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      // localStorage.setItem('userMessage', "To Manager: your quote was approved");
      setUserMessage("To Manager: your quote was approved");
      // incrementJobStatus();
    } else if (jobStatus === "Worker Assignment") {
      // const newStatus = incrementJobStatus();
      // form goes to manager
      // manager assigns worker
      // handle assignWorker
      // fetch license, name and surname from Worker
      try{
        fetchWorker(localStorage.getItem('workerID'));
          }  catch (error) {
        console.error('Failed to fetch worker in worker assign:', error);
          }

      const jobData = {
        jobStatus: incrementJobStatus(),
        workerId: '64c5540169a5213214551fcd'
       
      };
      updateJobFormData(jobId, jobData);  // update server
      // sendEmail('worker@example.com', 'New Job Assignment', 'You have a new job');
      // localStorage.setItem('userMessage', "To Worker: you have a new job");
      setUserMessage("To Worker: you have a new job");
      // incrementJobStatus();
    } else if (jobStatus === "Job Implementation") {
      //} else if (userStatus === "Worker" && jobStatus === "Job Implementation") {
        
      if (isChecked) {
        const jobData = {
        jobStatus: incrementJobStatus(),
        // workStarted: today,   // today's date when worker accept job  in handleAcceptJob
        maximumDemandInAmps,
        consumerMainsCapacity,
        electricalRetailer,
        energyDistributor,
        mainsPhases,
       
      };

      updateJobFormData(jobId, jobData);
         setUserMessage("To Manager: your job has been completed");
        setUserMessage("To Customer: your job has been completed, please leave a review");
        // incrementJobStatus();
      } else {
        // localStorage.setItem('userMessage', "To Worker: Compliance box must be checked first");
        // setUserMessage("To Worker: Compliance box must be checked first");
        alert("Compliance box must be checked first");
        return;
      }
    } else if (jobStatus === "Customer Review") {
      // const newStatus = incrementJobStatus();
      const jobData = {
        jobStatus: incrementJobStatus(),  // set jobstatus to closed
      reviewId,
      dateCompleted: today // today's date when customer submit review
      };
      updateJobFormData(jobId, jobData);
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
      // I am a new form, hurey!!!
      // setJobStatus("Quoting")
      // createNewJob();
    }else{

      //updateJob(id, data)
        //  update job with form data
    }


    


    navigate('/home', { state: { userStatus } });
    
  }; // end handle submit
  
  

  const handleAssignWorker = () => {
    // go to manage worker and hand over actual job id
    localStorage.setItem('workerJobID', jobId);
    localStorage.setItem('workerID', '64c553df69a5213214551fc9');

    navigate('/managerWorkers',{ state: { userStatus } });
    // console.log('loginpage' + {userStatus})
  };




  const handleAcceptJob = () => {
    // worker accepts job
    // send email or message to manager: "assigned worker accepted the job"
    const jobData = {

      workStarted: new Date().toISOString() // today's date when customer submit review
    };
    updateJobFormData(jobId, jobData);
    
    
    navigate('/home',{ state: { userStatus } });
    // console.log('loginpage' + {userStatus})
  };

  const handleRejectJob = () => {
    // worker recects job
    // send email or message to manager: "assigned worker recected the job"
    // Go back to previous process step
    decrementJobStatus();
    
    navigate('/home',{ state: { userStatus } });
    
    // go back to home view of worker
    // console.log('loginpage' + {status})
  };

  


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
          

{/* this form will always displayed but when Job status is not Draft, the fields will be grayed out */}
      
{/***************************  Job Status DRAFT ******************************888*/}

<div className="form-row">
            {/*allways be displayed  */}
          <p>Customer Details:</p> 
          {/* {(visibility.assignVisable) &&<button disabled={jobStatus !== "Draft"} onClick={copyUserData}>Copy from profile</button>} */}
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
       
         <input type="addressOfInstallation" value={addressOfInstallation} onChange={e => setaddressOfInstallation(e.target.value)} placeholder="Installation Address" disabled={jobStatus !== "Draft"} />
         {(editability.draftEditable)&&<button disabled={jobStatus !== "Draft"} onClick={handleCustomerData}>Copy from Customer</button>}
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
     
        <input className="date-input" type="date" value={dateQuoted} onChange={e => setDateQuoted(e.target.value)} placeholder="Date Quoted" disabled={(jobStatus !== "Quoting"||userStatus !== 'manager' )} />
        </div>
      
        <div className="form-row">
        <p>Ammount Quoted AUD </p>
        <input type="quoteAmmount" value={amountQuoted} onChange={e => setQuoteAmmount(e.target.value)} placeholder="Quote Ammount" disabled={jobStatus !== "Quoting"} />
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
          
          <input type="licenseNr" value={licenseNr} onChange={e => setLicenseNr(e.target.value)} placeholder="License Number" disabled={true} />
          <input type="workerName" value={workerName} onChange={e => setWorkerName(e.target.value)} placeholder="Worker Name" disabled={true} />
          {(editability.assignEditable)&&<button disabled={jobStatus !== "Worker Assignment"} onClick={handleAssignWorker}>Assign Electrical Worker</button>}
          </div>
          </div>}
{/***************************  Job Status Job Implementation ******************************888*/}
        {visibility.implementVisable &&
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Job Implementation</p>
          
          <div className="form-row">  
          {(editability.implementEditable)&&<button disabled={jobStatus !== "Job Implementation"} onClick={handleAcceptJob}>Accept Job</button>}
          {(editability.implementEditable)&&<button disabled={jobStatus !== "Job Implementation"} onClick={handleRejectJob}>Reject Job</button>}
          </div>
         
         <div className="form-row">
          <input type="maximumDemand" value={maximumDemandInAmps} onChange={e => setMaximumDemandInAmps(e.target.value)} placeholder="Maximum Demand in Amp" 
          disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")} />
          <input type="consumerMains" value={consumerMainsCapacity} onChange={e => setConsumerMains(e.target.value)} placeholder="Consumer Mains" 
          disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")} />
          </div>

          <div className="form-row">
          <input type="ectricalRetailer" value={electricalRetailer} onChange={e => setEctricalRetailer(e.target.value)} placeholder="Electrical Retailer" 
          disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")} />
          <input type="string" value={energyDistributor} onChange={e => setErgyDistributor(e.target.value)} placeholder="Energy Distributor" 
          disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")} />
          </div>

          <div className="form-row">
          <input type="phasesMains" value={mainsPhases} onChange={e => setPhasesMains(e.target.value)} placeholder="Phases Mains" 
          disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")} />
          </div>

          <input type="checkbox"checked={isChecked}onChange={handleOnChange}disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")}/>
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
        {/* {errorMessage && <p>{errorMessage}</p>} */}
        {jobStatus === "Customer Approval"? (
          <div>
           {(editability.quotingEditable)&& <button onClick={handleAccept}>Accept Quote</button> }
           {(editability.quotingEditable)&&<button onClick={handleReject}>Reject Quote</button>  }
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
