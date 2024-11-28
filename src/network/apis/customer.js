import {axiosInstance} from "./index";

export const customerSearch = async (term, cols = null) => {
  return await axiosInstance.get(`/customers/search?cols=${cols}`, {
    params: { term },
  });
};

export const customerPhoneVerify = async (phone) => {
  return await axiosInstance.get(`/customers/verify`, {
    params: { phone },
  });
};

export const customerStore = async (customerData) => {
  return await axiosInstance.post(`/customers/store`, customerData);
};

export const createNewCustomerAddress = async (customerId, customerAddress) => {
  return await axiosInstance.post(
    `/customers/${customerId}/addresses`,
    customerAddress
  );
};

export const createOrder = async (customerId, customerData) => {
  return await axiosInstance.post(
    `/customers/${customerId}/orders`,
    customerData
  );
};
