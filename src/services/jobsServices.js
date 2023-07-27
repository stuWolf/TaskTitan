const api = process.env.REACT_APP_BACKEND_URL;
const token = '' // taken from state
const headers = {
    'Authoriszation': `Bearer ${token}`,
    'Content-type':"application/json"
}

export async function getNotes(){
    const response = await fetch(`${api}/notes/my`,
    {headers: headers})
    const json = await response.json()
    return json
}

export async function createNote(data){
    const response = await fetch(`${api}/notes`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
    return json
}