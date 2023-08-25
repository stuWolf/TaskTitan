// import React from "react";
import React, { useState} from "react";
import '../App.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';

import JobColumns from '../components/home/jobColumns';

import DisplayJobs from "../components/home/displayJob";

import {   useNavigate} from 'react-router-dom';

function Home() {

  
  let navigate = useNavigate();
  
  const [userMessage, setUserMessage] = useState('')
  const userStatus = localStorage.getItem('userStatus');
 
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

console.log('rerender Home  ')

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
{/* <p> {userStatus}   </p> */}
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


        </div>
        {/* end jobs container */}

       
        
      {/* only displays when there is an error message */}
       {/* Show side pannel */}
       {/* <Side userMessage = {userMessage} /> */}
       <Side userMessage={userMessage} updateUserMessage={setUserMessage} />
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
