import { axiosInstance } from "./index";

// Get all store names
export const getStoreNamesRequest = async (term, country_id) =>
  await axiosInstance.get(`/products/store_names`, {
    params: {
      term,
      country_id,
    },
  });
