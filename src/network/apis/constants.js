import { axiosInstance } from "./index"

export const getAllConstants = async () =>
  await axiosInstance.get(`/general/constants`)
