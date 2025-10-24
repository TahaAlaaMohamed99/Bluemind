import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Api = axios.create({
  baseURL: "http://54.156.31.175",
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token is expired");
        localStorage.removeItem("token");
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
