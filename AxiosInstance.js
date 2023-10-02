import axios from "axios";
import { ML_SERVER_URL  } from "./env";


export default instance = axios.create({
    baseURL: ML_SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
      'timeout' : 10000
    },
  });
  