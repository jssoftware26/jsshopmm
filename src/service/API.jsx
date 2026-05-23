import axios from "axios";

const api = axios.create({
    baseURL:"https://jsshopserver.onrender.com/api"
})

export default api;