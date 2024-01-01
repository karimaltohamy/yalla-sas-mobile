import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

const apiAxios = axios.create({
  baseURL: "https://app.yalla-cash.com/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: " application/json",
  },
  withCredentials: false,
});

apiAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiAxios.interceptors.response.use(
  (response) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      response.headers.Authorization = `Bearer ${accessToken}`;
    }

    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.setItem("user", null);
      localStorage.setItem("access_token", null);
      window.location.reload();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiAxios;
