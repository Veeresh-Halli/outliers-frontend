import axios from "axios";

const loginapi = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_BASE_URL,
});

export default loginapi;
