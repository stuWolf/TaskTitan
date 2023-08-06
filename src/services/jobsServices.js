const api = process.env.REACT_APP_BACKEND_URL;
// const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': "application/json"
}

// console.log('job services token  '  + token)

// Get all jobs with status "open"
// Used in: manager view
export async function getOpenJobs() {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
    const response = await fetch(`${api}/jobs/status/open`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all jobs with given status
// Used in: search
export async function getStatusJobs(status) {
    const response = await fetch(`${api}/jobs/status/${status}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all jobs started by logged-in customer
// Used in: customer view search
export async function getMyJob() {
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
    const response = await fetch(`${api}/jobs`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

// Get all jobs
// Used in: admin
export async function getAllJobs() {
    const response = await fetch(`${api}/jobs`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get a job by ID
// Used in: display form
export async function getJob(id) {
    const response = await fetch(`${api}/jobs/${id}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Update a job
// Used in: job form
export async function updateJob(id, data) {
    const response = await fetch(`${api}/jobs/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}
