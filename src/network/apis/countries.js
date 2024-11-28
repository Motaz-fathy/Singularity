import { axiosInstance } from "./index";

export const requestAllCountries = () => axiosInstance.get("/countries/active");
