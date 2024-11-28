import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "../interceptors";

//add your BASE_URL to Constants file
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Handle request process
axiosInstance.interceptors.request.use((request) => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
