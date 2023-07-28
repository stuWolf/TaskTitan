const api = process.env.REACT_APP_BACKEND_URL;
const token = '' // taken from state
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json"
}

// Get all jobs with status "open"
// Used in: manager view
export async function getOpenJobs() {
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
// Used in: customer view
export async function getMyJob() {
    const response = await fetch(`${api}/jobs/myjobLogin`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all open jobs for logged in user
// Used in: customer view
export async function getMyJobsOpen() {
    const response = await fetch(`${api}/jobs/open`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all open jobs for a logged in worker, by worker ID
// Used in: worker view
export async function getAllJobsOpenWorker() {
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
