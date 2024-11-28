import { axiosInstance } from "./index";

export const requestProfileInfo = async () =>
  await axiosInstance.get("/profile/info");

export const editProfileInfoSubmit = async (data) =>
  await axiosInstance.post("/profile/edit", data);

export const changeProfilePic = async (data) =>
  await axiosInstance.post("/profile/change_picture", data);

export const changeEmailSubmit = async (data) =>
  await axiosInstance.post("/auth/change_email", {}, { params: { ...data } });

export const confirmEmailChangeRequest = async (token) =>
  await axiosInstance.get(`/auth/change_email/${token}`, {});

export const changePasswordSubmit = async (data) =>
  await axiosInstance.post(
    `/auth/change_password`,
    {},
    { params: { ...data } }
  );
