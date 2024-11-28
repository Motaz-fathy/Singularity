import { axiosInstance } from "./index";



// Get all Customers occasions with pagination
export const requestCustomersOccasions = async (params) =>
  await axiosInstance.get("/customer/occasions/all", { params });


