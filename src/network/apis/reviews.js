import { axiosInstance } from "./index";

// Get all adviser with pagination
export const getAllReviews = async ({
  product_id,
  product_name,
  rate_from_to,
  status,
  customer_name,
  customer_phone,
  customer_email,
  page,
}) => {
  const params = {
    product_id:product_id,
    product_name,
    rate_from_to,
    customer_name,
    customer_phone,
    customer_email,
    status,
    page: page,
  };

  return await axiosInstance.get("/rates/order_items", { params });
};

export const getReviewsDetails = async (id) =>
  await axiosInstance.get(`/rates/${id}/view`);


  
export const deleteReview = async (id) =>
  await axiosInstance.delete(`/rates/${id}/delete`);

export const changeReviewRequestStatus = async ({ id, status }) =>
  await axiosInstance.put(
    `rates/${id}/change_status?status=${status}`
  );
