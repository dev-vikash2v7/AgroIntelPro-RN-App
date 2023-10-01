import axios from "axios";


export default instance = axios.create({
    baseURL: 'https://agrointel-backend.onrender.com',
    // baseURL: ' https://204a-152-58-59-195.ngrok-free.app',
    timeout: 5000, // Set a timeout for requests in milliseconds (optional)
    headers: {
      'Content-Type': 'application/json', // Set default headers (optional)
    },
  });
  