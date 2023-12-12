import axios from "axios";

const apiAxios = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiAxios;
