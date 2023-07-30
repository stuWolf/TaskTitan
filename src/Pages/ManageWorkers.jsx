import React from 'react';
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import WorkerColumns from '../components/workerColumns';
import {  useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
function ManageWorkers() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
 let navigate = useNavigate();

 const [errorMessage, setErrorMessage] = useState("");
  const userMessage = localStorage.getItem('userMessage');


  const handleWorker = () => {
    // Handle login
    navigate('/addWorker');
    // could be signup with status 'new worker', just has extra fields
//  registerWorker(data)
 
  };
  // State to hold the workers
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = useCallback(async () => {
    try {
  
      let workerData;  
  
    
  
        workerData = await getAllJobsOpenWorker();
      
  
        // Check if workerData contains 'message404, not found'
        if (workerData.hasOwnProperty('message404')) {
          if (userStatus === "worker"){
          setErrorMessage("There are  no jobs for you at the moment");
          } else if (userStatus === "customer"){
            setErrorMessage("You have not lodged any jobs yet");
          } else { setErrorMessage("No jobs recorded yet");}
          return;
        }
  
  
        
      // console.log(workerData)not availabledateCreated
    
  // Filter out the required fields
  const filteredWorkers = workerData.map((job) => ({
    _id: job._id || 'No Data',  // Last 4 digits of _id
    workerId: job.workerId || 'No Data',
    addressOfInstallation: job.addressOfInstallation|| 'No Data',
    dateIn: job.dateCreated || 'No Data',
    dateQuoted: job.dateQuoted || 'No Data',
    workStart: job.workStarted || 'No Data',
    jobStatus: job.jobStatus || 'No Data',
    
  }));
  // Set the filtered jobs in state
  setJobs(filteredWorkers);
  
  // console.log('job.dateCreated' +  job.dateCreated)
      
      
    } catch (error) {
      console.error('Failed to fetch workers:', error);
      setErrorMessage("could not fetch workers");
    }
  },[userStatus]);
  // end fetch workers
  
  
  // setTimeout(() => {
     
  // }, 5000); // 2000 milliseconds = 2 seconds
  
  
  useEffect(() => {
  
  
    // Fetch the open jobs when the component mounts
    fetchWorkers();
  }, [fetchWorkers]);
  
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

  // call API to fetch all workers 

  // write all workers documents in an array of workers
  // display each row as a link, 
  // if (job in jobStatus = work assignment) when click assign worker to job
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />

      <div className="main-content">
        <h2>My Workers</h2>
        <p>User status: {userStatus}</p>
        <button onClick={handleWorker}>Add New Worker</button>
        <WorkerColumns/>


        <div className="jobs-container">
          {workers.map((job) => (
            // Display the job details
            // Replace this with your actual UI
            <div key={job._id} className="job-details">
              {/* <Link to="/jobForm">SignIn</Link> */}
              <p className="job-id"><Link to={`/jobForm/${job._id}`}>{job._id.slice(-4)}</Link></p>  {/* Link to the job details page */}
              <p>{job.workerId.slice(-4)}</p>
              <p>{job.addressOfInstallation}</p>
              <p>{formatDate(job.dateIn)}</p>
              <p>{formatDate(job.dateQuoted)}</p>
              <p>{formatDate(job.workStart)}</p>
              <p>{job.jobStatus}</p>
            </div>
          ))}
        </div>
        {errorMessage && <p>{errorMessage}</p>}





      </div>
       {/* end main -content */}

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      <Side/>

      <Footer/> 
    </div>
  );
}

export default ManageWorkers;
