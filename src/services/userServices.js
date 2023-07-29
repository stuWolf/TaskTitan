
const api = process.env.REACT_APP_BACKEND_URL;
const token = localStorage.getItem('token');
// const userId = localStorage.getItem('userId');
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json"
}




// Get users of a certain status
// Used in: search function, admin, manage workers
export async function getUsers() {
    const response = await fetch(`${api}/users/users`, { 
        headers: headers });
    const json = await response.json();
    return json;
}

// Get all users
// Used in: admin
export async function getAllUsers() {
    const response = await fetch(`${api}/users/all`, {
         headers: headers });

    const json = await response.json();
    
    return json;
}

// Register a Worker
// Used in: Manage Workers
export async function registerWorker(data) {
    const response = await fetch(`${api}/users/registerWorker`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}



// Get a user by ID
// Used in: display work form, copy from profile
export async function getUser(id) {
    const response = await fetch(`${api}/users/user/${id}`, { 
        headers: headers });
    const json = await response.json();
    return json;
}

// Get logged in user
// Used in: create new job, profile (id)
export async function getLoggedInUser() {
    // console.log('token from user services   ' + token)
    // console.log('token from user services   ' + headers )
    const response = await fetch(`${api}/users/loggedIn`, { 
        headers: headers });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
    const json = await response.json();
    return json;
}

// Update a user
// Used in: Profile window
export async function updateUser(data) {
    // console.log('token from user services   ' + token)
    // console.log('token from user services   ' + headers )
    const userId = localStorage.getItem('userId');
    console.log('userID update '+ userId)
    const response = await fetch(`${api}/users/user/${userId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

// Delete a user
// Used in: deregister (TODO)
export async function deleteUser(id) {
    const response = await fetch(`${api}/users/user/${id}`, {
        method: "DELETE",
        headers: headers
    });
    const json = await response.json();
    return json;
}
