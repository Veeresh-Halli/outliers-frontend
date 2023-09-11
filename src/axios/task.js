import axios from "axios";

const taskAPI = axios.create({
  baseURL: process.env.REACT_APP_TASKS_BASE_URL,
});

taskAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    const tempConfig = config;
    if (token) {
      tempConfig.headers["Authorization"] = token ? `Token ${token}` : "";
    }
    return config;
  },
  (error) => {
    console.log("ERROR IN REQUEST", error);
    return Promise.reject(error);
  }
);

taskAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = process.env.REACT_APP_REDIRECT_LOGIN_URL;
    }
    return Promise.reject(error);
  }
);

export default taskAPI;
