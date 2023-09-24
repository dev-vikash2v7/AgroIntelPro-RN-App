import axios from "axios";


export default instance = axios.create({
    baseURL: 'http://192.168.204.102:5000',
    timeout: 5000, // Set a timeout for requests in milliseconds (optional)
    headers: {
      'Content-Type': 'application/json', // Set default headers (optional)
    },
  });
  