import React, { useState, useEffect} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import InputBox from '../components/inputBox';
import TextField from '../components/textField';
import {  useNavigate,useParams} from 'react-router-dom';
import {getJob,createJob, updateJob} from "../services/jobsServices"
import {  getUser } from "../services/userServices";
import { getReview, createReview } from "../services/reviewsServices";
import {calculateVisibility} from "../services/visibilityManager";
import {calculateEditability} from "../services/editManager";
import SelectWorker from '../components/jobForm/selectWorker';
import ProgressBar from '../components/jobForm/progressBar';


import  {validateFields} from '../services/helpFunctions'

  
  function JobForm() {
    
   
const { jobId } = useParams();
// const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [addressOfInstallation, setaddressOfInstallation] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [preferredJobCompletionDate, setpreferredJobCompletionDate] = useState("");
  const [dateQuoted, setDateQuoted] = useState("");
  const [amountQuoted, setQuoteAmmount] = useState("");
  const [quoteAttachment, setQuoteAttachment] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [workStarted, setWorkStarted] = useState("");
  const [licenseNr, setLicenseNr] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [maximumDemandInAmps, setMaximumDemandInAmps] = useState("");
  const [consumerMainsCapacity, setConsumerMains] = useState("");

  const [electricalRetailer, setEctricalRetailer] = useState("");
  const [energyDistributor, setErgyDistributor] = useState("");
  const [mainsPhases, setPhasesMains] = useState("");

  const [errorMessage, setErrorMessage] = useState("");


    const [startDate, setStartDate] = useState("");
    const [review, setReview] = useState("");
    const [reviewId, setReviewId] = useState("");
    const [reviewStars, setReviewStars] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true)  // foor toggle user data
    // let location = useLocation();
    const userStatus = localStorage.getItem('userStatus');

    let navigate = useNavigate();

    const [userMessage, setUserMessage] = useState("")
    const jobStatuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
    const [jobStatus, setJobStatus] = useState("Draft");
    const [visibility, setVisibility] = useState({quotingVisable: false, assignVisable: false, implementVisable: false, reviewVisable: false,});
    const [editability, setEditability] = useState("");
    const userId = localStorage.getItem('userId');
    const [today] = useState( new Date().toISOString());
    
    

  // **** logic of the form

  const fetchWorker = async (workerId) => {
    // fetch name and license no from worker ID and write them into form variables
    try {
      const workerData = await getUser(workerId);
      console.log('workerid  '  + workerId)
      // console.log('workerData from fetch Worker:', workerData);
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
    // setDateCreated(userData.dateCreated);
  } catch (error) {
    console.error('Failed to fetch data from logged in customer:', error);
  }
};

const fetchReview = async (reviewId) => {
  try {
    const reviewData = await getReview(reviewId);
    // console.log('review from fetch review:', reviewData);
    if (reviewData.hasOwnProperty('message404')){
      setReview('no review yet')

    }else{
      setReviewStars(reviewData.stars);
      setReview(reviewData.review );
      setCompletionDate(formatDate(reviewData.endDate ));

    }

    
  } catch (error) {
    console.error('Failed to fetch data from review ID:', error);
  }
};  


const fetchJob = async () => {
  try {
   
    const jobData = await getJob(jobId);

    setCustomerId(jobData.customerId);  // load existing job
    setJobStatus(jobData.jobStatus);
    setaddressOfInstallation(jobData.addressOfInstallation);
    setScopeOfWork(jobData.scopeOfWork);
    setpreferredJobCompletionDate(formatDate(jobData.preferredJobCompletionDate));
    setDateCreated(formatDate(jobData.dateCreated));
    setDateQuoted(formatDate(jobData.dateQuoted));
    setQuoteAmmount(jobData.amountQuoted);
    setQuoteAttachment('https://example.com/quote2.pdf');
    // setQuoteAttachment(jobData.quoteAttachment);
    setWorkerId(jobData.workerId);
    setWorkStarted(formatDate(jobData.workStarted)); // for display
    setStartDate(jobData.workStarted); // for later creation of review
    setMaximumDemandInAmps(jobData.maximumDemandInAmps);
    setConsumerMains(jobData.consumerMainsCapacity);
    setEctricalRetailer(jobData.ectricalRetailer);
    setErgyDistributor(jobData.energyDistributor);
    setPhasesMains(jobData.mainsPhases);
    setReviewId(jobData.reviewId);
    // setCompletionDate(jobData.setCompletionDate); // comes from review
    // setDateQ
    // set
    // console.log('marker 1' )
    // Fetch user data after job data is successfully fetched, update fields in customer header
    // if(!email){
      if(jobData){
      fetchUser(jobData.customerId); 
    }
 

    // fetch worker info and write license nr and name 
    // if (visibility.implementVisable) {
      if (workerId) {
      // console.log('marker 2' )
      // console.log('fetchWorker(workerId);' + workerId)
      fetchWorker(workerId);
    }
    // fetch review data and put them in to form

    if (reviewId) {
      fetchReview(jobData.reviewId);
      // console.log('fetchReview(jobData.reviewId)' + reviewId)
    }
  } catch (error) {
    console.error('Failed to fetch job:', error);
  }

 

};// end fetch job



  useEffect(() => {
  
    

      // console.log('visibility' + visibility)
      // console.log('userId  ' + userId + 'customerId  ' + customerId)
      if(userId && customerId&&jobStatus && userStatus){
       
        setEditability (calculateEditability(jobStatus, userStatus, userId, customerId));
        setVisibility(calculateVisibility(jobStatus, userStatus,userId, customerId));
      }
    
  
  // copyUserData();
  
  }, []);
  
useEffect(() => {
  // Fetch the job details when the component mounts
  // only when opened from joblist link
  // if lodged from start new job (jobId = 0): customer ID is from new user
  // jobStatus = draft
  // load jobdata
  // localStorage.setItem('jobStatus', jobStatus)



  
// this runs when job is selected from form . fetch all values, render form according to status
  

  // console.log('visibility.assignVisable' + visibility.assignVisable)



  if (jobId === 'New') {
    
    // console.log('jobId'+  jobId+   'fetch jobb called')
    // console.log('preferredJobComplDraftetionDate '  + preferredJobCompletionDate)
    setCustomerId(userId);
    console.log('jobId:  '+  jobId)
    // setEditability (calculateEditability(jobStatus, userStatus, userId, customerId));
  // get variables of logged in user and fill in the status variables for the form
  if(userId &&jobStatus && userStatus ){
       
    setEditability (calculateEditability(jobStatus, userStatus, userId, userId));
    setVisibility(calculateVisibility(jobStatus, userStatus,userId, userId));
    console.log('editVisability set')
  }
  
  fetchUser(userId); 
  } else{
    
    fetchJob(visibility);  // get jobdata from server if existing job, this fills the form
    console.log('jobId:  '+  jobId)

    if(userId && customerId&&jobStatus && userStatus){
       
      setEditability (calculateEditability(jobStatus, userStatus, userId, customerId));
      setVisibility(calculateVisibility(jobStatus, userStatus,userId, customerId));
      // console.log('editVisability set')
    }
  }
  // console.log('userId  ' + userId + 'customerId  ' + customerId)
  



}, [jobStatus]);  // end use effect








  
    const handleCustomerData = () => {
      // copy customer address to job address
      setaddressOfInstallation(address)
      // alert("TODO");
    
    };


  const handleOnChange = () => {
    setChecked(!isChecked);
    // for tickbox worker , job complies
  }




  const handleClose = () => {

    if (jobStatus === 'Closed')
    {
      navigate('/completed',{ state: { userStatus } });

    }else{
      navigate('/home',{ state: { userStatus } });
    }
    
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
    const newMessage = " Quote Accepted";
    setUserMessage(newMessage);

      // go back to home view of role who edited the form
      setTimeout(() => {
        navigate('/home', { state: { userStatus } });
      }, 1000); // 2000 milliseconds = 2 seconds



    
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
    const newMessage = " Quote Rejected";
    setUserMessage(newMessage);
    setTimeout(() => {
      navigate('/home', { state: { userStatus } });
    }, 1000); // 2000 milliseconds = 2 seconds
 
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


const incrementJobStatus = (steps = 1) => {
  let currentIndex = jobStatuses.indexOf(jobStatus);
  let finalIndex = currentIndex + steps;

  if (finalIndex > jobStatuses.length - 1) {
    console.log("Job status is already at the final state");
    setJobStatus("Draft");
    return "Draft";
  } else {
    const newStatus = jobStatuses[finalIndex];
    setJobStatus(newStatus);
    console.log("jobStatus incremented, new status is: " + newStatus);
    return newStatus;
  }
};

const createNewReview = async (reviewData, jobId, newStatus) => {
  try {
    const reviewResponse = await createReview(reviewData); 

    // console.log("reviewData", reviewData.endDate);
    console.log("Review id:", reviewResponse._id);
    // console.log("Review response  endDate:", reviewResponse.endDate);
    const jobData ={
      jobStatus: newStatus,
      reviewId: reviewResponse._id
    }

// console.log('reviewResponse' , reviewResponse)
    const newJob = await updateJob(jobId, jobData); 
    // console.log("Job updated with new review:", newJob);

    return { reviewId: reviewResponse._id, updatedJob: newJob };
  } catch (error) {
    console.error("Error in createNewReview:", error);
    throw error;  // re-throwing the error if you want to handle it outside this function
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
  

  // scopeOfWork,
  // addressOfInstallation,
  // preferredJobCompletionDate )



  try {
    const newJob = await updateJob(jobId,jobData); 
    console.log("New job updated:", newJob);
  } catch (error) {
    console.error("Failed to update job:", error );
  }
  
};// end updateJobFormData 



const handleWorkerSelected = (workerId, firstName, license) => {

  setLicenseNr(license);
  setWorkerId(workerId);
  

      // You can now use these values in the parent component
    };

  const handleSubmit = async () => {

    // setToday( new Date().toISOString());  // get today's date in ISO format
    // console.log('setToday  ' +  new Date().toISOString())
    if (jobStatus === "Draft") {
      
      const { isFormSubmitted, errorMessage } = validateFields(scopeOfWork, addressOfInstallation,preferredJobCompletionDate);
      // dummy proof form, test if all fields filled
      setIsFormSubmitted(isFormSubmitted);
      setErrorMessage(errorMessage);
      if(!errorMessage){


      let newStatus 

      if (userStatus === 'manager') {
        newStatus = incrementJobStatus(3); // increment by 2 for a manager
      } else {
        newStatus = incrementJobStatus(); // increment by 1 by default
      }

console.log('newStatus', newStatus)
      if (jobId === 'New'){
        
      const jobData = {
        jobStatus: newStatus,
        customerId,     // id of logged in user from local memory
        scopeOfWork,
        addressOfInstallation,
        preferredJobCompletionDate,
        dateCreated: today  // today's date when submit Draft
        // here later job date raised by customer  -> Not needed, created by server
      };
// get job data from form and create new job
  
  // console.log('usermessage', userMessage)
    createNewJob(jobData);
    }else{
      // job already exists  for potential save button, or close does a save of the draft job
      const jobData = {
        jobStatus: newStatus,
        dateCreated: today
      }
      updateJobFormData(jobId, jobData); // update with new status

    };
    const newMessage = 'New job Created';
    setUserMessage(newMessage);
//  setTimeout(() => {
//       navigate('/home', { state: { userStatus } });
//     }, 1000); // 2000 milliseconds = 2 seconds
  } else{

    return;
  } ; // end validate fields
      // sendEmail('manager@example.com', 'New Quote Request', 'A new quote request has arrived');
 


 
      // console.log('usermessage', newMessage)
      // console.log('handle Submit next status  ' + newStatus);
     
    } else if (jobStatus === "Quoting") {
      const { isFormSubmitted, errorMessage } = validateFields(amountQuoted);
      // dummy proof form, test if all fields filled
      setIsFormSubmitted(isFormSubmitted);
      setErrorMessage(errorMessage);
      if(!errorMessage){

      const newStatus = incrementJobStatus();
      

      const jobData = {
  
        // jobStatus: incrementJobStatus(),
        jobStatus: newStatus,
        dateQuoted: today,   // today's date when manager submit quote
        amountQuoted,
        quoteAttachment
        
        
      };
      const newMessage = " Quote sent";
      setUserMessage(newMessage);
     
      console.log('handle Submit next status  ' + jobData.jobStatus);

      updateJobFormData(jobId, jobData);
      setTimeout(() => {
      navigate('/home', { state: { userStatus } });
    }, 1000); // 2000 milliseconds = 2 seconds
  } ; // end validate

      // update job with form data
  
      // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
     
    
      // ************************************************  END QUoting *****************************
    } else if (jobStatus === "Customer Approval") {
      //not needed, done in accept quote handler
      
      
        // sendEmail('customer@example.com', 'Your Quote Has Arrived', 'Your quote has arrived');
      
 
      const newMessage = " You approved your job";
      setUserMessage(newMessage);
      
      // incrementJobStatus();
      // ************************************************  Customer Approval *****************************
    } else if (jobStatus === "Worker Assignment") {
      const { isFormSubmitted, errorMessage } = validateFields(workerId);
      // dummy proof form, test if all fields filled
      setIsFormSubmitted(isFormSubmitted);
      setErrorMessage(errorMessage);
      if(!errorMessage){
      const newStatus = incrementJobStatus();
      const jobData = {
        jobStatus: newStatus,
        workerId: workerId
       
      };
      updateJobFormData(jobId, jobData);  // update server
      // sendEmail('worker@example.com', 'New Job Assignment', 'You have a new job');
      

      const newMessage = " Worker Assigned";
      setUserMessage(newMessage);
    } else{

      return;
    } ; 
    // ************************************************ END Worker Assignment *******************
    } else if (jobStatus === "Job Implementation") {
      //} else if (userStatus === "Worker" && jobStatus === "Job Implementation") {
        
      if (isChecked) {

        const { isFormSubmitted, errorMessage } = validateFields(maximumDemandInAmps,consumerMainsCapacity,
          electricalRetailer, energyDistributor, mainsPhases);
      // dummy proof form, test if all fields filled
      setIsFormSubmitted(isFormSubmitted);
      setErrorMessage(errorMessage);
      if(!errorMessage){
        const newStatus = incrementJobStatus();

        const jobData = {
        jobStatus: newStatus,
        // workStarted: today,   // today's date when worker accept job  in handleAcceptJob
        maximumDemandInAmps,
        consumerMainsCapacity,
        electricalRetailer,
        energyDistributor,
        mainsPhases,
       
      };

      updateJobFormData(jobId, jobData);

      
      
       
        // incrementJobStatus();
      } else {
    
  
         return;
      }
      const newMessage = " Job Completed";
      setUserMessage(newMessage);
    } else{
      // setTimeout(() => {
        setErrorMessage("Compliance box must be checked first");
      // }, 2000);
      return;
    } ; // end validate fields


// ******************************************** END Job implementation ********************************
    } else if (jobStatus === "Customer Review") {
      const { isFormSubmitted, errorMessage } = validateFields(reviewStars,review);
    // dummy proof form, test if all fields filled
    setIsFormSubmitted(isFormSubmitted);
    setErrorMessage(errorMessage);
    if(!errorMessage){
      const newStatus = incrementJobStatus();
// const newStatus = 'Customer Review'
        // greate new review with 
        const reviewData = {
          jobId,
          userId,
          workerId,
          startDate: startDate, // from jobData.workStarted
          endDate:today,
          stars: reviewStars,
          review


        }
//  console.log('today', today,  reviewData.endDate   )

         createNewReview (reviewData, jobId,newStatus)

        
      // sendEmail('manager@example.com', 'New Review', 'A new review has arrived');
      // localStorage.setItem('userMessage', "To Manager: a new review has arrived");
      // setUserMessage("To Manager: a new review has arrived");

      // create new review,  review ID from response just created review

      

      const newMessage = " Review submitted";
      setUserMessage(newMessage);
    } else{

      return;
    } ;// end validate fields
      // return;
    } // end if jobstatus = customer review


    // allways increment, gets decremented when customer rejects quote or worker rejects job

    // console.log('End handle Submit next status  ' + jobStatus)  // this is not updated yet
      

    setTimeout(() => {
      navigate('/home', { state: { userStatus } });
    }, 1000); // 2000 milliseconds = 2 seconds
    // needs to be done individual for each state
    
  }; // end handle submit
  
  




  const handleAcceptJob = () => {
    // worker accepts job
    // send email or message to manager: "assigned worker accepted the job"
    const jobData = {

      workStarted: today // today's date when customer submit review
    };
    updateJobFormData(jobId, jobData);
    
    const newMessage = " Job Accepted";
      setUserMessage(newMessage);
    
      setTimeout(() => {
        navigate('/home', { state: { userStatus } });
      }, 1000); // 2000 milliseconds = 2 seconds
      
    // console.log('loginpage' + {userStatus})
  };

  const handleRejectJob = () => {
    // worker recects job
    // send email or message to manager: "assigned worker recected the job"
    // Go back to previous process step
    decrementJobStatus();
    const newMessage = " Job Rejected";
    setUserMessage(newMessage);


    setTimeout(() => {
        navigate('/home', { state: { userStatus } });
      }, 1000); // 2000 milliseconds = 2 seconds
    
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
  
  // console.log('visibility.approvalEditable ' + visibility.approvalEditable)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
      <p>You are logged in as: {userStatus}</p>

<div className="job-form-and-side-panel">
<div className="job-form">
    {/* <div className="job-form"> */}
        <h2>Job Profile</h2>
        <ProgressBar jobStatus = {jobStatus} />
        <div className="form-row">
        
        {/* <p>Job status: {jobStatus}</p> */}
        </div>
    {/* </div> */}
{/***************************  Job Status DRAFT ******************************888*/}

  <button onClick={toggleForm}>Toggle Customer data</button>
      {isFormVisible && (
        <div className="job-form">
          

{/* this form will always displayed but when Job status is not Draft, the fields will be grayed out */}
      
{/***************************  Job Status DRAFT ******************************888*/}
<h1> </h1>
<div className="form-row">
    <InputBox 
        id="FirstName" 
        label="First Name" 
        setValue={FirstName} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setFirstName(value); }} 
    />

    <InputBox 
        id="LastName" 
        label="Last Name" 
        setValue={LastName} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setLastName(value); }} 
    />
</div>

<div className="form-row">
    <InputBox 
        id="phone" 
        label="Phone" 
        setValue={phone} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setPhone(value); }} 
    />

    <InputBox 
        id="email" 
        label="Email address" 
        setValue={email} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setEmail(value); }} 
    />
</div>

<div className="form-row">
    <InputBox 
        id="address" 
        label="Address" 
        setValue={address} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setAddress(value); }} 
    />
</div>

<div className="form-row">
    <InputBox 
        id="addressOfInstallation" 
        label="Installation Address" 
        setValue={addressOfInstallation} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setaddressOfInstallation(value); }} 
    />
    {(editability.draftEditable) && <button disabled={jobStatus !== "Draft"} onClick={handleCustomerData}>Copy from Customer</button>}
</div>

<p>Scope of Work: </p> 
<div className="form-row">
    <TextField 
        id="reviewInput" 
        label="" 
        setValue={scopeOfWork} 
        isDisabled={jobStatus !== "Draft"} 
        isSubmitted={isFormSubmitted} 
        onChange={(value) => { setScopeOfWork(value); }} 
    />
</div>

{!editability.draftEditable ? (
    <div>
        <div className="form-row">
            <p>Prefered completion date: {preferredJobCompletionDate}</p> 
        </div>
    </div>
) : (
    <div>
      <h1> </h1>
      <h1> </h1>
      <p> </p>
        <div className="form-row">
            {/* <p>Prefered completion date:</p>  */}
            <InputBox 
                id="completionDate" 
                label="Prefered Completion Date" 
                setValue={preferredJobCompletionDate} 
                isDisabled={jobStatus !== "Draft"} 
                isSubmitted={isFormSubmitted} 
                onChange={(value) => { setpreferredJobCompletionDate(value); }} 
            />
        </div>
    </div>
)}

{errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
</div>

            
      )} 
      {/* end isform visible */}

   {/*************************** End Job Status DRAFT ******************************888*/}         
{/***************************  Job Status Quoting ******************************888*/}
{(visibility.quotingVisable)&& <div className="job-form">
      <div className="form-row">
        <p>Date Created by     customer:    {dateCreated} </p>
        <p>  dateQuoted</p>
        {/* <input className="date-input" type="date" value={preferredJobCompletionDate} onChange={e => setpreferredJobCompletionDate(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} /> */}
    
 
          
        {
          
  dateQuoted 
    ? (!isNaN(new Date(dateQuoted).getTime()) 
        ? <p>Date Quoted: {dateQuoted} </p>
        : <p>Date Quoted: {'No Data'} </p>)

    : null
}
     
        {/* <input className="date-input" type="date" value={dateQuoted} onChange={e => setDateQuoted(e.target.value)} placeholder="Date Quoted" disabled={(jobStatus !== "Quoting"||userStatus !== 'manager' )} /> */}
        </div>
      
        <div className="form-row">
    <InputBox 
        id="quoteAmmount"
        label="Ammount Quoted AUD"
        setValue={amountQuoted}
        isDisabled={jobStatus !== "Quoting"}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setQuoteAmmount(value); }}
    />
    <a href={quoteAttachment} target="_blank" rel="noopener noreferrer">Quote attached</a>
</div>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        {/* <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} /> */}
        </div> }
{/* end quoting visible */}
{/***************************  end Job Status Quoting ******************************888*/}


   {/***************************  Job Status  Customer Approval ******************************888*/} 
{/* 
         {(visibility.quotingVisable) &&
         <div>
          
          <p>For approval please confirm Clicking ACCEPT</p>
        </div>} */}
{/***************************  Job Status Worker Assignment******************************888*/}
        {(visibility.assignVisable) &&
          <div className="job-form">
            <p>Your Electrical Worker </p>
            <h1> </h1>
            <div className="form-row">
    <InputBox 
        id="licenseNr"
        label="License Number"
        setValue={licenseNr}
        isDisabled={true}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setLicenseNr(value); }}
    />

    {(editability.assignEditable) && <SelectWorker onWorkerSelected={handleWorkerSelected} />}

    {(!editability.assignEditable) && 
        <InputBox 
            id="workerName"
            label="Worker Name"
            setValue={workerName}
            isDisabled={true}
            isSubmitted={isFormSubmitted}
            onChange={(value) => { setWorkerName(value); }}
        />
    }

          </div>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          </div>} 

          {/* end assignVisable */}
{/***************************  Job Status Job Implementation ******************************888*/}
        {visibility.implementVisable &&
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          <p>Job Implementation</p>
          {(editability.implementEditable)&&<p style={{color: 'red'}}>Please accept job before you start !</p>}
          <div className="form-row"> 

          {(editability.implementEditable)&&<button disabled={jobStatus !== "Job Implementation"} onClick={handleAcceptJob}>Accept Job</button>}
          {(editability.implementEditable)&&<button disabled={jobStatus !== "Job Implementation"} onClick={handleRejectJob}>Reject Job</button>}
          </div>
         
          <div className="form-row">
    <InputBox 
        id="maximumDemand"
        label="Maximum Demand in Amp"
        setValue={maximumDemandInAmps}
        isDisabled={jobStatus !== "Job Implementation" || userStatus !== "worker"}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setMaximumDemandInAmps(value); }}
    />
    <InputBox 
        id="consumerMains"
        label="Consumer Mains"
        setValue={consumerMainsCapacity}
        isDisabled={jobStatus !== "Job Implementation" || userStatus !== "worker"}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setConsumerMains(value); }}
    />
</div>

<div className="form-row">
    <InputBox 
        id="ectricalRetailer"
        label="Electrical Retailer"
        setValue={electricalRetailer}
        isDisabled={jobStatus !== "Job Implementation" || userStatus !== "worker"}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setEctricalRetailer(value); }}
    />
    <InputBox 
        id="energyDistributor"
        label="Energy Distributor"
        setValue={energyDistributor}
        isDisabled={jobStatus !== "Job Implementation" || userStatus !== "worker"}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setErgyDistributor(value); }}
    />
</div>

<div className="form-row">
    <InputBox 
        id="phasesMains"
        label="Phases Mains"
        setValue={mainsPhases}
        isDisabled={jobStatus !== "Job Implementation" || userStatus !== "worker"}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setPhasesMains(value); }}
    />
</div>


         
          <input type="checkbox"checked={isChecked}onChange={handleOnChange}disabled={(jobStatus !== "Job Implementation"||userStatus !== "worker")}/>
          <label>I, the electrical worker certify that the electrical installation work above complies to the electrical safety standards</label>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          
        
        </div>} 
        {/* end implement visable */}
{/***************************  Job Customer Review ******************************888*/}
        {(visibility.reviewVisable) &&
         <div className="job-form">
          {/* <button onClick={handleNewJob}>Create New Job</button>  */}
          
          <div className="form-row">
          {workStarted &&  <p>Date work started {workStarted}</p>}
         
          { dateQuoted && (isNaN(new Date(dateQuoted).getTime()) ? <p>Date Quoted: No Data</p> : <p>Date Quoted: {dateQuoted}</p>) }


          {/* <input type="date" value={workStarted} onChange={e => setStartDate(e.target.value)} placeholder="Start Date" disabled={jobStatus !== "Customer Review"} /> */}
          </div>
          {editability.reviewEditable ? (
          <div className="form-row">

              <p>Please rate your work</p>
              <select value={reviewStars} onChange={e => setReviewStars(e.target.value)} >
                  <option value="">Rating</option>
                  <option value="1 Star" >1 Star</option>
                  <option value="2 Star">2 Star</option>
                  <option value="3 Star">3 Star</option>
                  <option value="4 Star">4 Star</option>
                  <option value="5 Star">5 Star</option>
              </select>


          </div>
        ) : ( <p>Review Stars: {reviewStars}</p>    )}




          {/* <p>Review </p>  */}
          <div className="form-row">
    <TextField 
        id="reviewInput"
        label="Review"
        setValue={review}
        isDisabled={!editability.reviewEditable}
        isSubmitted={isFormSubmitted}
        onChange={(value) => { setReview(value); }}
    />
</div>


          <div className="form-row">
          {completionDate && <p>Date work completed: {completionDate} </p>} 
          {/* <p>Date work completed</p> */}
          {/* <input type="text" value={completionDate} onChange={e => setCompletionDate(e.target.value)} placeholder= "Completion Date" disabled={jobStatus !== "Customer Review"} /> */}
          </div>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          </div>}
{/* end review visible */}
      

        {/* visibility.quotingVisable */}

        {jobStatus === "Customer Approval"? (
          <div>
            {(visibility.quotingVisable)&&  <p>For approval please confirm Clicking ACCEPT</p>}
           {(visibility.quotingVisable)&& <button onClick={handleAccept}>Accept Quote</button> }
           {(visibility.quotingVisable)&&<button onClick={handleReject}>Reject Quote</button>  }
            <button onClick={handleClose}>Close</button>
        </div>
        ) : (
          <div>
            {(visibility.submitVisable)&&<button onClick={handleSubmit}>Submit</button> }
            {/* <button onClick={handleSave}>Save</button>  */}
            <button onClick={handleClose}>Close</button>
             
        </div>
        )}  
        {/* end Job Status */}


 
            </div>
      {/* end job form top */}
      {/* Show side pannel */}
      <Side userMessage = {userMessage} />
      </div>  {/* "job-form-and-side-panel" */}
      </div>
      {/* end main content */}
      <Footer/> 
    </div>  
    // end app
  );
}

export default JobForm;
