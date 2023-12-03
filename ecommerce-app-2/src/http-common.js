import axios from "axios"

export default axios.create(
    { baseURL : "https://localhost:5050/api",
       headers: {
        "Content-type" : "application/json"
       }

});