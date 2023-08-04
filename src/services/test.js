const incrementJobStatus = () => {
    const currentIndex = jobStatuses.indexOf(jobStatus);
    if (currentIndex < jobStatuses.length - 1) {
      const newStatus = jobStatuses[currentIndex + 1];
      setJobStatus(newStatus);
      // localStorage.setItem('jobStatus', newStatus);
      console.log("jobStatus incremented, new status is: "+ newStatus);
    } else {
  
      console.log("Job status is already at the final state");
     setJobStatus("Draft");
     
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
  
  
    const handleSubmit = async () => {
      console.log('handleSubmit jobstat  ' + jobStatus)
      if (jobStatus === "Draft") {
  
        // if Job ID === 0 , create job with form data
  
        incrementJobStatus();  // increments to "Quoting"  :336
        // incrementJobStatus();
        // localStorage.setItem('jobStatus', 'Quoting');
        console.log('handle Submit next status  ' + jobStatus)   // right back to draft
   // I am a new form, hurey!!!
        // setJobStatus("Quoting")
        createNewJob();   // right back to draft :350
  
        //if (userStatus === "Customer" && jobStatus === "Draft") {
        // sendEmail('manager@example.com', 'New Quote Request', 'A new quote request has arrived');
        // localStorage.setItem('userMessage', "To Manager: a new quote request has arrived");
        setUserMessage("To Manager: a new quote request has arrived");
        // incrementJobStatus();
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
        // I am a new form, hurey!!!
        // setJobStatus("Quoting")
        // createNewJob();
      }else{
  
          //  update job with form data
      }
      
      
  
  
      navigate('/home', { state: { userStatus } });
      
    };