import axios from "axios";
import { ML_SERVER_URL } from "./env";

export default instance = axios.create({
    baseURL: ML_SERVER_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  