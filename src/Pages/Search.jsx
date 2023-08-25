import React, { useState, useEffect } from "react";
import '../App.css';
import '../Search.css';
import Header from '../components/header';
import Footer from '../components/footer';
import  Navbar from '../components/navbar';
import Side from '../components/SidePanel';
import SelectWorker from '../components/jobForm/selectWorker';
import ProgressBar from '../components/jobForm/progressBar';
import InputBox from '../components/inputBox';
import TextField from '../components/textField';
import SSEComponent from '../components/home/SSEC';
import  {validateFields} from '../services/helpFunctions'
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
  const [surname, setSurname] = useState("");
  const [review, setReview] = useState("");
  // const [nameError, setNameError] = useState(false);
  // const [surnameError, setSurnameError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    setUserMessage(selectedStatus)
    // setName(selectedStatus)
  }, [selectedStatus]);
  // console.log(workers)

  const handleSubmit = () => {
  

        const { isFormSubmitted, errorMessage } = validateFields(name, surname);
        setIsFormSubmitted(isFormSubmitted);
        setErrorMessage(errorMessage);
        if(!errorMessage){

          setUserMessage(`Field value:  ${name} ${ surname}`);
        }

  }
 

 
  // call API to fetch all workers, this is the Interface to the selectWorker element

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
       <div className="main-content">
      <h2>What we are planning to do here</h2>
      <p>Search all reviews from a customer</p>
      <p>Search all reviews about a worker</p>
      <p>Many more ...</p>
      <p>For now just test ground for some cool stuff to integrate ...</p>
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
                setValue={name}  //input for data from fetch
                isDisabled={false}  // This will make the input box non-editable
                isSubmitted = {isFormSubmitted} // submit button pushed, triggers the check if all values present
                onChange={(value) => { setName(value); }}  // output for manual entry
// handle the change event. can not set has error here because it will not work on first submit
             

            />

<h2>  </h2>
            <InputBox 
                id="surnameInput" 
                label="Surname" 
                setValue={surname}
                isDisabled={false}  // This will make the input box non-editable
                isSubmitted = {isFormSubmitted}
                onChange={(value) => { setSurname(value); }}
            />
         <h2>  </h2>
         <TextField 
                id="reviewInput" 
                label="Review" 
                setValue={review}
                isDisabled={false}  // This will make the input box non-editable
                isSubmitted = {isFormSubmitted}
                onChange={(value) => { setReview(value); }}
            />


<SSEComponent/>


{errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      




<button onClick={handleSubmit}>Submit</button> 
<h2>  </h2>
      <SelectWorker onWorkerSelected={handleWorkerSelected} />

      <h2>  </h2>
      <ProgressBar jobStatus = {selectedStatus} />
      <h2>  </h2>
       {/* end main -content */}

      
      </div>
      <Side userMessage={userMessage} updateUserMessage={setUserMessage}/>
      </div>

          </div>
      {/* end main content */}
      <Footer/> 
    </div>
  );
}

export default Search;
