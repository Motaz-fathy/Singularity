import { axiosInstance } from "./index"

const getNotificationList = (page) => axiosInstance.get(`/notifications`, { params: { page } })

const addNewNotification = (data) => axiosInstance.post('/notifications/store', data)

export { getNotificationList, addNewNotification }