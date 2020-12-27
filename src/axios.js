import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.SERVERLINK ? process.env.SERVERLINK : "http://localhost:5000/"
})

export default instance