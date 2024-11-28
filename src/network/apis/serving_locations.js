import { axiosInstance } from "./index"

const getServingLocationsList = (page) => axiosInstance.get(`/serving_locations`, { params: { page } })

const addNewServingLocation = (data) => axiosInstance.post('/serving_locations/store', data)

export { getServingLocationsList, addNewServingLocation }