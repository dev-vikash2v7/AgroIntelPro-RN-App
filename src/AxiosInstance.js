import axios from "axios";

export default instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 5000, // Set a timeout for requests in milliseconds (optional)
    headers: {
      'Content-Type': 'application/json', // Set default headers (optional)
    },
  });
  