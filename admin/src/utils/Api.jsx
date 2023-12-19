import axios from "axios";

export default   axios.create({
  baseURL: "https://klipto-inc-abcstudio-server.onrender.com/api/v1/",
 headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
 }
}) 