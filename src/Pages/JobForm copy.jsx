import React, { useState, useEffect} from "react";
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
  // const [jobStatus, setJobStatus] = useState("Draft");
    // This state determines whether the form is visible or not

    const [startDate, setStartDate] = useState("");
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState(false);
    const [completionDate, setCompletionDate] = useState("");
    // const [userMessage, setUserMessage] = useState(" No Messages");
    


  const [isFormVisible, setIsFormVisible] = useState(true)
  let location = useLocation();
  let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  // let userMessage = location.state.userMessage;



  const [userMessage, setUserMessage] = useState(localStorage.getItem('userMessage') || "No Messages");
  // const [jobStatus, setJobStatus] = useState(localStorage.getItem('jobStatus') || "Draft");

  const jobStatuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review"];

  const [jobStatus, setJobStatus] = useState(localStorage.getItem('jobStatus') || "Draft");



  useEffect(() => {
    localStorage.setItem('userMessage', userMessage);
  }, [userMessage]);

 

  





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
    // alert("TODO");
    // (Customer submits new job)
    // if (userStatus === "Customer")&&(JobStatus === "Draft")
    // send email to manager: "a new quote request has arrived"
    // userMessage = "To Manager: a new quote request has arrived"

//(Manager submit quote)
    // if  (userStatus === "Manager")&&(JobStatus === "Quoting")
    // send email to Customer: "rour quote has arrived"
    // userMessage = "To Customer: your quote has arrived"
    // incrementJobStatus();

    // (Manager submit worker assignment)
    // if  (userStatus === "Manager")&&(JobStatus === "Worker Assignment")
    // send email  to Worker: "you have a new job"
    // userMessage = "To Worker: you have a new job"
     // incrementJobStatus();

    // (Worker submits completed job: )
    // if  (userStatus === "Worker")&&(JobStatus === "Job Implementation")
// if (isChecked) {
    // send email to Manager: "your job has been completed"
    // userMessage = "To Manager: your job has been completed"

     // incrementJobStatus();} 
     // else{userMessage = "To Worker: Compliance box must be checked first"
    // alert("Compliance box must be checked first");}

    // (Customer submits new review)
    // if  (userStatus === "Customer")&&(JobStatus === "Customer Review")
    // send email to manager: "a new review has arrived"
    // userMessage = "To Manager: a new review has arrived"
    if (jobStatus === "Customer Review") {
      localStorage.setItem('jobStatus', "Draft");
      navigate('/home', { state: { userStatus } });
   
    }

    incrementJobStatus();
    console.log('handle submit next' , jobStatus)
    alert('incrementJobStatus updated' + jobStatus)
       // save changes to document of Jobs collection,
    // worker can only submit if tickbox is set
    // go back to home view of role who edited the form
    if (userStatus === "Worker") {
      if (isChecked) {
        navigate('/home', { state: { userStatus } });
      } else {
        alert("Compliance box must be checked first");
      }
    } else {
      navigate('/home', { state: { userStatus } });
    }
    //  console.log('handle submit' + userStatus)
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

    



    <div className="job-form">
        <h2>Job Profile</h2>
        <div className="form-row">
        <p>User status: {userStatus}</p>
        <p>Job status: {jobStatus}</p>
        </div>
      </div>
{/***************************  Job Status DRAFT ******************************888*/}


      {/* Show side pannel */}
      <Side userMessage = {userMessage} />

      <Footer/> 
    </div>
  );
}

export default JobForm;
