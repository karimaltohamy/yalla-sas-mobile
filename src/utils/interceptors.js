import apiAxios from "./apiAxios";
const accessToken = sessionStorage.getItem("access_token");

apiAxios.interceptors.response.use(
  (response) => {
    apiAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      apiAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return apiAxios(error.config);
    }

    return error;
  }
);
