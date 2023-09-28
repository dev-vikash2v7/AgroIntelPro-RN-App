import axios from "axios";


export default instance = axios.create({
    baseURL: 'https://b0b6-2409-40c4-4f-8560-181e-d50f-7aad-61d8.ngrok-free.app',
    timeout: 5000, // Set a timeout for requests in milliseconds (optional)
    headers: {
      'Content-Type': 'application/json', // Set default headers (optional)
    },
  });
  