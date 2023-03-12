import axios from 'axios'

export function loginUser(dataToSubmit) { //body는 dispatch로 부터 받은 데이터

    //서버에다가 request날리고, 받은 데이터를 request에 저장.
    const request = axios.post("http://localhost:8000/auth/login", dataToSubmit,  { withCredentials: true })
    .then( response => response.data)
    //리턴시켜서 reducer로 보내야 함.
    return {
        type: "LOGIN_USER",
        payload: request
    }
}

export function registerUser(dataToSubmit) { //body는 dispatch로 부터 받은 데이터

    //서버에다가 request날리고, 받은 데이터를 request에 저장.
    const request = axios.post("http://localhost:8000/auth/register", dataToSubmit)
    .then( response => response.data)
    //리턴시켜서 reducer로 보내야 함.
    return {
        type: "REGISTER_USER",
        payload: request
    }
}

export function auth(dataToSubmit) { //body는 dispatch로 부터 받은 데이터

    const request = axios.get("http://localhost:8000/auth/testauth")
    .then( response => response.data)

    return {
        type: "AUTH_USER",
        payload: request
    }
}