const api = process.env.REACT_APP_BACKEND_URL;
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json"
}

// Create a review
export async function createReview(data) {
    const response = await fetch(`${api}/reviews`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

// Get a review by ID
export async function getReview(id) {
    const response = await fetch(`${api}/reviews/${id}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all reviews
export async function getAllReviews() {
    const response = await fetch(`${api}/reviews`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get a review for a specific job ID
export async function getJobReview(jobId) {
    const response = await fetch(`${api}/reviews/job/${jobId}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all reviews for a specific worker ID
export async function getWorkerReview(workerId) {
    const response = await fetch(`${api}/reviews/worker/${workerId}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Get all reviews for a specific customer ID
export async function getCustomerReview(customerId) {
    const response = await fetch(`${api}/reviews/customer/${customerId}`, { headers: headers });
    const json = await response.json();
    return json;
}

// Delete a review
export async function deleteReview(id) {
    const response = await fetch(`${api}/reviews/${id}`, {
        method: "DELETE",
        headers: headers
    });
    const json = await response.json();
    return json;
}
