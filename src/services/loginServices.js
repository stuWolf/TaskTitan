const api = process.env.REACT_APP_BACKEND_URL;
const token = '' // taken from state
const headers = {
    'Authoriszation': `Bearer ${token}`,
    'Content-type':"application/json"
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
    const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    const json = await response.json();
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
    const json = await response.json();
    return json;
}
