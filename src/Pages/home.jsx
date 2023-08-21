import React, { useState,useEffect} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import {getCountOfJobs } from "../services/jobsServices";
// import {getStatusJobs  } from "../services/jobsServices";
// import {getCountOfJobs  } from "../services/jobsServices";
// import {getUser} from '../services/userServices';
import JobColumns from '../components/home/jobColumns';
// import { Link } from 'react-router-dom';
import DisplayJobs from "../components/home/displayJob";
// import {useUserMessaging} from "../services/userMessaging.js";


// import JobForm from '../Pages/JobForm';
import {   useNavigate} from 'react-router-dom';

function Home() {

  // let location = useLocation();
  // let userStatus = location.state.userStatus;
  let navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState("");
  // const [userMessage, setUserMessage] = useState('');
  // const [closedJobCount, setClosedJobCount] = useState('');
  const [previousJobCounts, setPreviousJobCounts] = useState(() => {
    // Retrieve from localStorage when initializing the state
    const savedCounts = localStorage.getItem('previousJobCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
});
  
  
const [userMessage, setUserMessage] = useState("")
  // const [userMessage, setUserMessage] = useState(localStorage.getItem('userMessage') || "");
  // const [userMessage, setUserMessage] = useState('')
  const userStatus = localStorage.getItem('userStatus');
  const [pollingInterval, setPollingInterval] = useState(5000); // Start with 5 seconds
    const [noChangeCount, setNoChangeCount] = useState(0); // Count how many times no change is detected
  // State to hold the jobs
  // const [jobs, setJobs] = useState([]);
  
  // const previousJobCountRef = useRef(0);

  // const [previousJobCounts, setPreviousJobCounts] = useState(0); // Add this state variable at the top of your component
  const [initializationPhase, setInitializationPhase] = useState(true);
  const handleNewJob = () => {
// Create new job button pressed
// localStorage.setItem('jobStatus', "Draft");
    navigate('/jobForm/New');
    // Handle login
    // console.log('loginpage' + {userStatus})
  };

//  on the API side: 

// find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus


// the manager sees all open jobs, the customer sees all jobs originated by him, 
// the worker sees all jobs assigned to him
// each row should be a link to the corresponding job. when clicked, display Job form, using search job by ID with corresponding status and user roll
// manager should be able to see the whole form for review (the visability of the form is according to job status -> visibilityManager.js)
// link to job clicked -> job form opens -> call API to fetch data from Job collection-> fill form -> user updates form -> update job when form submit 


// interface for Displayjobs
// const handleUserMessageChange = (message) => {
//   setUserMessage(message);
//   // Now, sidebarUserMessage contains the userMessage from DisplayJobs
//   // You can use it as input for the sidebar or wherever you need it
// };

const messageMapping = {
  "Quoting": {
      "manager": "You have a new job for quoting"
  },
  "Customer Approval": {
      "customer": "Your quote just arrived"
  },
  "Worker Assignment": {
      "manager": "Your quote was approved, Please assign a worker"
  },
  "Job Implementation": {
      "worker": "You received a new job for processing"
  },
  "Customer Review": {
      "customer": "Your job has been completed, please write a review",
      "manager": "Another job has been completed, time to write an invoice"
  },
  "Closed": {
      "manager": "Another job closed"
  }
};
// const jobStatuses = ["Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
let jobStatuses = [];
// this defines the jobs of what status are momnitored, this are also the jobs that are displayed
    if (userStatus === "manager") {
        jobStatuses = ["Quoting", "Worker Assignment", "Closed"];
    } else if (userStatus === "customer") {
        jobStatuses = ["Customer Approval", "Customer Review"];
    } else if (userStatus === "worker") {
        jobStatuses = ["Job Implementation"];
    }
    // const [previousJobCounts, setPreviousJobCounts] = useState({});

    useEffect(() => {
      const countJobs = async () => {
          const responses = await Promise.all(jobStatuses.map(status => getCountOfJobs(localStorage.getItem('userId'), userStatus, status)));
          const counts = responses.map(response => response.totalJobs);
          const saveAndSetPreviousJobCounts = (updatedCounts) => {
            // Save to localStorage
            localStorage.setItem('previousJobCounts', JSON.stringify(updatedCounts));
            // Update the state
            setPreviousJobCounts(updatedCounts);
        };
        

          let updatedCounts = { ...previousJobCounts };
          let changeDetected = false;

          for (let i = 0; i < jobStatuses.length; i++) {
              const currentCount = counts[i];
              const status = jobStatuses[i];
              const previousCount = previousJobCounts[status] || 0;

              // console.log('status ' + status)
              // console.log('currentCount ' + currentCount)
       
              // console.log('previousCount ' + previousCount)

              if (!initializationPhase && currentCount > previousCount) {
                  changeDetected = true;
                  const message = messageMapping[status] && messageMapping[status][userStatus];
                 
                  if (message) {
                      setUserMessage(message);
                      // console.log('message' + message)
                  }
              }

              updatedCounts[status] = currentCount;
          }

          if (changeDetected) {
              // Reset the polling interval and no change count when a change is detected
              setPollingInterval(5000);
              setNoChangeCount(0);
          } else {
              // Increase the no change count
              setNoChangeCount(prevCount => prevCount + 1);

              // If no changes are detected for 3 consecutive polls, double the polling interval
              if (noChangeCount >= 3) {
                console.log('pollingInterval ' + pollingInterval )
                  setPollingInterval(prevInterval => prevInterval * 2);
                  setNoChangeCount(0); // Reset the no change count
              }
          }

          saveAndSetPreviousJobCounts (updatedCounts);

          if (initializationPhase) {
              setInitializationPhase(false);
          }
      };

      const interval = setInterval(() => {
          countJobs();
      }, pollingInterval);

      return () => clearInterval(interval);
  }, [previousJobCounts, userStatus, initializationPhase, pollingInterval, noChangeCount]);
    














  // console.log('home  ' + userStatus)
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />
     
      <div className="main-content">
      

      <div className="form-row">
      
        <h2>My Jobs </h2>
        
        {(userStatus === "manager"||userStatus === "customer" )&&
        <div>

        <button onClick={handleNewJob}>Create New Job</button>
        
        </div>
        }
        <p>Welcome back {localStorage.getItem('userName')},  you are logged in as {userStatus}</p> 
      </div>
     
      <div className="jobs-container-and-side-panel">
          {/* <p>Manager view : List of all jobs with Status, assigned worker, quote, and customer details. Option to add new job or quote.</p>  */}
          {/* // find all open jobs using getOpenJobs(), and filter out  _id ,  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus

//  put all filtered jobs in an array local memory.
// display this array with the following columns:
//  _id (last 4 digits),  workerID, addressOfInstallation, dateQuoted, workStart, jobStatus */}





<div className="jobs-container">

<JobColumns />
{/* <h2>Closed Jobs</h2> */}

{userStatus === 'manager' ? (
        <DisplayJobs 
          user_id={localStorage.getItem('userId')} 
          userStatus={userStatus} 
          jobStatus={'Quoting'} 
          // onUserMessageChange={handleUserMessageChange} 
        />
      ) : null}
     {(userStatus === 'customer'  )? ( 
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'Customer Approval'} 
                // onUserMessageChange={handleUserMessageChange} 
            />

            

            ) : null}

{(userStatus === 'customer'  )? ( 
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'Customer Review'} 
                // onUserMessageChange={handleUserMessageChange} 
            />  

            ) : null}
        {userStatus === 'manager' ? (    
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'Worker Assignment'} 
                // onUserMessageChange={handleUserMessageChange} 
            />
) : null}
{userStatus === 'worker' ? (
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'Job Implementation'} 
                // onUserMessageChange={handleUserMessageChange} 
            />
            ) : null}

{(userStatus === 'customer' || userStatus === 'manager')? (
<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'!Closed'} 
                // onUserMessageChange={handleUserMessageChange} 
                
            />
            ) : null}


<DisplayJobs 
                user_id={localStorage.getItem('userId')} 
                userStatus={userStatus} 
                jobStatus={'Closed'} 
                // onUserMessageChange={handleUserMessageChange} 
            />



        </div>
        {/* end jobs container */}

       
        
      {/* only displays when there is an error message */}
       {/* Show side pannel */}
       <Side userMessage = {userMessage} />
      {/* no messages created here */}
      
      </div> 
        {/* end jobs containerand side panel */}
        
      </div>
      {/* end main -content */}  
      {/* {errorMessage && <p>{errorMessage}</p>} */}
      <Footer/> 
    </div>
  );
}

export default Home;
