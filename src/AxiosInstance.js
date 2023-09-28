import axios from "axios";


export default instance = axios.create({
    baseURL: 'https://f477-49-43-41-156.ngrok-free.app',
    timeout: 5000, // Set a timeout for requests in milliseconds (optional)
    headers: {
      'Content-Type': 'application/json', // Set default headers (optional)
    },
  });
  