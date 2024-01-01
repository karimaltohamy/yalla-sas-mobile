import { useNavigate } from "react-router-dom";
import apiAxios from "./apiAxios";

// apiAxios.interceptors.response.use(
//   (response) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken) {
//       response.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return response;
//   },
//   async (error) => {
//     console.log(error);

//     if (error.data.message === "unauthorized") {
//       const navigate = useNavigate();

//       try {
//         await apiAxios.get("mob/logout");
//         localStorage.setItem("access_token", null);
//         apiAxios.defaults.headers.common["Authorization"] = null;
//         navigate("/login");

//         return Promise.reject(error);
//       } catch (logoutError) {
//         console.error("Error during logout:", logoutError);

//         navigate("/login");

//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiAxios;
