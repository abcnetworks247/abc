import axios from "axios";


export default axios.create({
   baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
   withCredentials: true,
   headers:{
    Accept: "application/json",
    "Content-Type": "application/json",
   }
})