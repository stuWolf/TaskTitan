let usersCache = {}; // Cache for user data

const fetchJobs = useCallback(async () => {
  try {
    let numberOfJobs;

    // Check the number of jobs based on userStatus
    if (userStatus === "manager") {
      numberOfJobs = await getCountOfJobs();
    } else if (userStatus === "customer") {
      numberOfJobs = await getCountOfJobs(customerId);
    } else if (userStatus === "worker") {
      numberOfJobs = await getCountOfJobsWorker(workerId);
    }

    let jobsData = JSON.parse(localStorage.getItem('jobsData') || 'null');

    // If the number of jobs has increased or jobsData doesn't exist in localStorage, fetch the data
    if (!jobsData || numberOfJobs > (jobsData.length || 0)) {
      if (userStatus === "manager") {
        jobsData = await getOpenJobs();
      } else if (userStatus === "customer") {
        jobsData = await getMyJobsOpen();
      } else if (userStatus === "worker") {
        jobsData = await getAllJobsOpenWorker();
      }
      localStorage.setItem('jobsData', JSON.stringify(jobsData)); // Save to localStorage
    }

      // Cache the fetched jobsData
    //   jobsDataCache = jobsData;
    

    // Handle 'message404, not found'
    if (jobsData.hasOwnProperty('message404')) {
      handleErrorMessage(userStatus);
      return;
    }

    // Fetch user data in parallel
    const customerPromises = jobsData.map(job => {
      if (!usersCache[job.customerId]) {
        return getUser(job.customerId).then(data => {
          usersCache[job.customerId] = data.firstName || 'No Name';
          job.customer = usersCache[job.customerId];
        });
      } else {
        job.customer = usersCache[job.customerId];
        return Promise.resolve();
      }
    });

    const workerPromises = jobsData.map(job => {
      if (job.workerId) {
        if (!usersCache[job.workerId]) {
          return getUser(job.workerId).then(data => {
            usersCache[job.workerId] = data.firstName || 'No Name';
            job.workerId = usersCache[job.workerId];
          });
        } else {
          job.workerId = usersCache[job.workerId];
          return Promise.resolve();
        }
      } else {
        job.workerId = 'No Data';
        return Promise.resolve();
      }
    });

    await Promise.all([...customerPromises, ...workerPromises]);

    // Filter out the required fields
    const filteredJobs = jobsData.map((job) => ({
        _id: job._id || 'No Data',  // Last 4 digits of _id
        workerName: job.workerId || 'No Data',
      // extract this dataset out of each job in jobs.data
        //  customerName: job.workerId
        customerName: job.customer,
        addressOfInstallation: job.addressOfInstallation|| 'No Data',
        dateIn: job.dateCreated || 'No Data',
        dateQuoted: job.dateQuoted || 'No Data',
        workStart: job.workStarted || 'No Data',
        jobStatus: job.jobStatus || 'No Data',
        
      }));

    setJobs(filteredJobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    setErrorMessage("could not fetch jobs");
  }
}, []);

function handleErrorMessage(userStatus) {
  if (userStatus === "worker") {
    setErrorMessage("There are no jobs for you at the moment");
  } else if (userStatus === "customer") {
    setErrorMessage("No Jobs yet. Lodge your first job by clicking 'Create New Job'");
  } else {
    setErrorMessage("No jobs recorded yet");
  }
}
