import axios from "axios";

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
    return Promise.reject(error);
  }
);

export default apiAxios;
