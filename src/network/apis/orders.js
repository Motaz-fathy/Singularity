import { axiosInstance } from "./index";

/****|| Orders ||****/

// Get all Orders with pagination
export const requestOrders = async (params) =>
  await axiosInstance.get("/orders/pending", { params });

// Get all Orders with pagination
export const requestPaidOrders = async (params) =>
  await axiosInstance.get("/orders/paid", { params });

// Get all Orders with pagination
export const requestOrderDetails = async (id) =>
  await axiosInstance.get(`/orders/${id}/view`);

// Cancel single order
export const cancelSingleOrder = async (id, status) =>
  await axiosInstance.put(`/orders/${id}/cancel?status=${status}`);

//Update suborder /orders/7/update_status?order_item_id[0]=19&order_item_status[0]=3
export const updateSubOrder = async (id, order_item_id, order_item_status) =>
  await axiosInstance.put(
    `/orders/${id}/update_pending_status?order_item_id[0]=${order_item_id}&order_item_status[0]=${order_item_status}`
  );

  export const updatePendingOrderPackage = async (id, order_item_id, order_item_status) =>
  await axiosInstance.put(
    `/orders/${id}/update_pending_package_status?order_package_id[0]=${order_item_id}&order_package_status[0]=${order_item_status}`
  );

//Update suborder /orders/7/update_status?order_item_id[0]=19&order_item_status[0]=3
export const updatePaidSubOrder = async (
  id,
  order_item_id,
  order_item_status
) =>
  await axiosInstance.put(
    `/orders/${id}/update_paid_status?order_item_id[0]=${order_item_id}&order_item_status[0]=${order_item_status}`
  );

  export const updatePaidSubPackage = async (
    id,
    order_item_id,
    order_item_status
  ) =>
    await axiosInstance.put(
      `/orders/${id}/update_paid_package_status?order_package_id[0]=${order_item_id}&order_package_status[0]=${order_item_status}`
    );
    

//Delete product from order /orders/mainId/item/subId/delete
export const deleteOrder = async (id, order_item_id) =>
  await axiosInstance.delete(`/orders/${id}/item/${order_item_id}/delete`);
  //Delete package from order /orders/mainId/item/subId/delete
export const deletePackage = async (orderId, packagedId) =>
await axiosInstance.delete(`/orders/${orderId}/package/${packagedId}/delete`);

//Add product to /orders/37/add_product?product_id[]=39
export const addNewProduct = async (id, params) => {
  return await axiosInstance.post(`/orders/${id}/add_product`, params);
};

//Get product with option to add to order /orders/27/add_product/6334

export const getProductDetails = async (id, itemId) =>
  await axiosInstance.get(`/orders/${id}/add_product/${itemId}`);

export const getProductDetailsEdit = async (id, itemId) =>
  await axiosInstance.get(`/orders/${id}/edit_product/${itemId}`);

export const UpdateProductDetailsEdit = async (id, itemId, data) =>
  await axiosInstance.put(`/orders/${id}/edit_product/${itemId}`, data);

export const setOrderStatusToPaid = async (id) =>
  await axiosInstance.put(
    `/orders/${id}/set_paid?payment_method_title=By bank transfer`
  );
