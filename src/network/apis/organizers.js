import { axiosInstance } from "./index";

/****|| ORGANIZERS ||****/

// Get all organizers with pagination

export const requestOrganizers = async (params) =>
  await axiosInstance.get("/organizers", { params });

export const addOrganizerRequest = async (data) => {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return await axiosInstance.post(`/organizers`, formData);
};

// Post Filter Occasion ⇒ Receives queryParams
// export const filterOccasions = async (data) =>
//   await axiosInstance.post("/occasion/filter/", {}, { params: data });

export const activateDeactivateOrganizer = async ({ id, status }) =>
  await axiosInstance.put(`/organizers/${id}/change_status?status=${status}`);

export const blockUnBlockOrganizer = async ({ id, block }) => {
  await axiosInstance.put(`/organizers/${id}/change_block?block=${block}`);
};

//Get single  ORGANIZER with Specific id
// export const getOrganizerDetails = async (id) =>
//   await axiosInstance.get(`/organizer/${id}`);
export const getOrganizersDetails = async (id) =>
  await axiosInstance.get(`/organizers/${id}/view`);
