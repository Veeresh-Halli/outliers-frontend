import axios from "axios";

const taskAPI = axios.create({
  baseURL: process.env.REACT_APP_TASKS_BASE_URL,
});

function getCsrfToken() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("csrftoken=")) {
      return cookie.substring("csrftoken=".length, cookie.length);
    }
  }
  return null;
}

const csrfToken = getCsrfToken();

taskAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    const tempConfig = config;
    tempConfig.withCredentials = true;
    tempConfig.crossDomain = true;
    tempConfig.defaults = {};
    tempConfig.defaults.withCredentials = true;
    tempConfig.headers["X-CSRFToken"] = csrfToken;
    tempConfig.headers.csrf = csrfToken;
    tempConfig.headers["Authorization"] = token ? `Token ${token}` : "";
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
