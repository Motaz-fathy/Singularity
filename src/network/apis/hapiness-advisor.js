import { axiosInstance } from "./index";

// Get all adviser with pagination
export const allSuggestions = async (params) => {
  return await axiosInstance.get("/adviser/requests", { params });
};

export const changeAdviserRequestStatus = async ({ id, status }) =>
  await axiosInstance.put(
    `/adviser/requests/${id}/change_status?status=${status}`
  );

export const getAdviserDetails = async (id) =>
  await axiosInstance.get(`/adviser/requests/${id}`);

export const changeHappinesStatus = async (id, status) =>
  await axiosInstance.put(
    `/adviser/requests/${id}/change_status?status=${status}`
  );
