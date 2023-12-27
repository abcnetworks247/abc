import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    
  },
});
