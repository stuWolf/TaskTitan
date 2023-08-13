import React, { useState, useEffect } from "react";
import '../App.css';
import '../Search.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import SelectWorker from '../components/selectWorker';
import ProgressBar from '../components/progressBar';
import InputBox from '../components/inputBox'
// import WorkerColumns from '../components/workerColumns';
// import {  useNavigate} from 'react-router-dom';

// import { Link } from 'react-router-dom';
function Search() {


  const userStatus = localStorage.getItem('userStatus');
  
 // Get a reference to the history object
//  let navigate = useNavigate();


  // const userMessage = localStorage.getItem('userMessage');
  // to get back to jobform of actual job
  // const [jobIdHome, setJobIdHome] = useState(localStorage.getItem('workerJobID'));
  // const jobStatusJobForm = localStorage.getItem('jobStatus');

 const [errorMessage, setErrorMessage] = useState("");
 const [userMessage, setUserMessage] = useState('');
  const statuses = ["Draft", "Quoting", "Customer Approval", "Worker Assignment", "Job Implementation", "Customer Review", "Closed"];
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  
  const [name, setName] = useState("fritz");
  // const [surname, setSurname] = useState("");
  // const [nameError, setNameError] = useState(false);
  // const [surnameError, setSurnameError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  
  // console.log(workers)

  const handleSubmit = () => {

    // let hasError = false;
    setIsFormSubmitted(true);
    console.log('issubmitted  ' + isFormSubmitted)
    if (!name) {
      // setNameError(true);
      setErrorMessage("Please fill in missing fields");
      return; // Exit the function early
  } else {
    setErrorMessage('')
    setUserMessage(`Field value:  ${name}`);
      // setNameError(false);
  }



  // if (!surname.current.value) {
  //     setSurnameError(true);
  //     hasError = true;
  // } else {
  //     setSurnameError(false);
  // }

// this is necessary because hasError from input Box is only set when the field value changes
  //   if (hasError) {
  //     setErrorMessage("Please fill in missing fields");
  //     return; // Exit the function early
  // } else{
  //   setErrorMessage('')
  //   setUserMessage(`Field value:  ${name}`);
  // }


console.log('issubmitted  ' + isFormSubmitted)



  }
 

  useEffect(() => {
    setUserMessage(selectedStatus)
    // setName(selectedStatus)
  }, [selectedStatus]);




 
  // call API to fetch all workers 

  const handleWorkerSelected = (workerId, firstName, license) => {
    console.log("Selected Worker ID:", workerId);
    console.log("Selected Worker First Name:", firstName);
    console.log("Selected Worker License:", license);
    // You can now use these values in the parent component
  };

  
  return (
    <div className="App">
      <Header />
      <Navbar userStatus = {userStatus} />
      <h2>Playground</h2>
      <div className="job-form-and-side-panel">
<div className="job-form">
       
        
        

 {/* Dropdown for selecting a status */}
 <select value={selectedStatus} onChange={handleStatusChange}>
        {statuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <h2>  </h2>

      <InputBox 
                id="nameInput" 
                label="Name" 
                setValue={name}
                onChange={(value) => {
                    setName(value);
// handle the change event. can not set has error here because it will not work on first submit
              }}
                isDisabled={false}  // This will make the input box non-editable
                isSubmitted = {isFormSubmitted}
            />
            {/* <InputBox 
                id="surnameInput" 
                label="Surname" 
                value={surname}
                onChange={handleInputChange}
                 isDisabled={false}  // This will make the input box non-editable
            /> */}
            {/* <button onClick={handleSubmit}>Submit</button> */}
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      


{/* {errorMessage && <p>{errorMessage}</p>} */}

<button onClick={handleSubmit}>Submit</button> 
<h2>  </h2>
      <SelectWorker onWorkerSelected={handleWorkerSelected} />

      <h2>  </h2>
      <ProgressBar jobStatus = {selectedStatus} />
      
       {/* end main -content */}

      {/* <div className="side-panel">
        <h2>Notifications</h2>
        <p>Notifications about new jobs, quotes, assignments, and reviews.</p>
      </div> */}
      </div>
      <Side userMessage = {userMessage} />
      </div>
      <Footer/> 
    </div>
  );
}

export default Search;
