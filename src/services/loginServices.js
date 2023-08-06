const api = process.env.REACT_APP_BACKEND_URL;
const token = localStorage.getItem('token');
const headers = {
     'Authorization': `Bearer ${token}`,
    'Content-Type': "application/json"
}

// Signup a new user, general
export async function signup(data) {
    const response = await fetch(`${api}/login/signup`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

// Login a user
export async function login(data) {
    // console.log('login from login services client' + json)
    console.log('login token from login services client' + headers.token)
    const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log('login from login services client' + json)
    console.log('login token from login services client' + headers.token)
    return json;
}

// Register a Customer
// Used in: Register customer. userState = customer
export async function registerCustomer(data) {
    const response = await fetch(`${api}/login/registerCustomer`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    console.log('Server response:', response);
    const json = await response.json();
    return json;
}
