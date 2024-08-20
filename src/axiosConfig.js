import axios from "axios";

const instance = axios.create({
  baseURL: "http://103.127.136.157:3000/api",
  timeout: 5000,
});

export default instance;
