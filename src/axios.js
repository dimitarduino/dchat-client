import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVERLINK ? process.env.REACT_APP_SERVERLINK : "http://localhost:5000/"
})

export default instance