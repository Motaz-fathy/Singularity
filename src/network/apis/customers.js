import { axiosInstance } from "./index";

/****|| Packages ||****/

// Get all Products with pagination
export const requestCustomers = async (params , headers={}) =>
  await axiosInstance.get("/customers", { params , headers});

//PUT block / unblock  Specific customer
export const changeBlockStatus = async (id, status) =>
  await axiosInstance.put(`/customers/${id}/change_block?status=${status}`);

//Get single  Product with Specific id
export const getCustomerDetails = async (id) =>
  await axiosInstance.get(`/customers/${id}`);

export const addCustomer = async (values) =>
  await axiosInstance.post(`customers/store`, {}, { params: { ...values } });
  export const editCustomer = async (id,values) =>
  await axiosInstance.post(`/customers/${id}/edit`, {}, { params: { ...values, _method: "PUT" } });
