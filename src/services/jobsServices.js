const api = process.env.REACT_APP_BACKEND_URL;
// const token = localStorage.getItem('token');
// const headers = {
//     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     'Content-Type': "application/json"
// }

// console.log('job services token  '  + token)

// Get all jobs with status "open"
// Used in: manager view
export async function getOpenJobs() {
    const headers = {
        
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    // console.log('get open jobs')
    const response = await fetch(`${api}/jobs/status/open`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all jobs with given jobStatus, userId and userStatus
// Used in: search
//call: const result = await getStatusJobs('12345', 'Worker', 'Active');

export async function getStatusJobs(user_id, userStatus, jobStatus) {
    const url = `${api}/jobs/${user_id}/${userStatus}/${jobStatus}`;
    
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(url, { headers: headers });
    const json = await response.json();
    return json;
}


// Get all jobs started by logged-in customer
// Used in: customer view search
export async function getMyJob() {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs/myjobLogin`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all open jobs for logged in user
// Used in: customer view
export async function getMyJobsOpen() {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs/open`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all open jobs for a logged in worker, by worker ID
// Used in: worker view
export async function getAllJobsOpenWorker() {
    const headers = {
        
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs/open/worker`, { headers: headers });
    const json = await response.json();
    return json;
}

// Create a job
// Used in: Manager and customer view
export async function createJob(data) {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Count all jobs, optional for a specific user
// Used in: home getCountOfJobs
// needs to be upgraded with parameter userId
// call: const result = await getCountOfJobs('12345', 'Worker', 'Closed');

export async function getCountOfJobs(user_id, userStatus, jobStatus) {
    let url = `${api}/jobs/count/${user_id}/${userStatus}/${jobStatus}`;
    
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(url, { headers: headers });
    
    // await delay(100);
    const json = await response.json();
    return json;
}

// Count all jobs, optional for a specific worker
// Used in: home getCountOfJobs
// needs to be upgraded with parameter userId
// export async function getCountOfJobsWorker(workerId) {
//     const headers = {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': "application/json"
//     }
//     const response = await fetch(`${api}/jobs/countWorker/${workerId}`, { headers: headers });
//     const json = await response.json();
//     return json;
// }

// Get all jobs
// Used in: admin getCountOfJobs
export async function getAllJobs() {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get a job by ID
// Used in: display form
export async function getJob(id) {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs/${id}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Update a job
// Used in: job form
export async function updateJob(id, data) {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}
