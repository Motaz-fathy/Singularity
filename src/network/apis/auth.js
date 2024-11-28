import axios from "axios";
import { axiosInstance } from "./index";

export const loginRequest = async ({ email, password }) => {
  const formData = new FormData();
  formData.append('Email', email);
  formData.append('Password', password);

  try {
    const response = await axios.post('https://zyan.tech/dashboard/api/User/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response?.data?.token?.token)
     if(response.status === 200 ) {
      window.localStorage.setItem("token" , response?.data?.token?.token)
     }
    return response?.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const forgetPasswordResetLinkRequest = async ({ email }) =>
  await axiosInstance.post(`/auth/reset_password`, {
    email,
  });

export const resetPasswordRequest = async ({
  token,
  email,
  password,
  password_confirmation,
}) =>
  await axiosInstance.post(
    `/auth/reset_password/${token}`,
    {},
    { params: { token, email, password, password_confirmation } }
  );

export const logoutRequest = async () =>
  await axiosInstance.get(`/auth/logout`);
