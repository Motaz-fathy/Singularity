import { axiosInstance } from "./index";

export const getAllCategories = async (params) =>
  await axiosInstance.get("/categories", { params });

export const changeCategoryStatus = async (payload) =>{
  await axiosInstance.put(
    `/categories/${payload.id}/change_active?status=${payload.status}`
  );
}


//Post new subcategory ==> Receives queryParams and image in the body
export const addCategoryRequest = async ({
  category_name_en,
  category_name_ar,
  order,
  status,
  image,
}) => {
  let formData = new FormData()
  formData.append("image", image)

  let objParams = {
    "category_name[ar]": category_name_ar,
    "category_name[en]": category_name_en,
    order: order,
    status: status,
    commission_rate_id: 1
  }
  return await axiosInstance.post(`/categories/store?`, formData, {
    params: objParams
  })
}


export const editCategoryRequest = async ({
  id,
  category_name_en,
  category_name_ar,
  order,
  status,
  image,
}) => {

  let formData = new FormData()
  formData.append("image", image)

  let objParams = {
    "category_name[ar]": category_name_ar,
    "category_name[en]": category_name_en,
    order: order,
    status: status,
    commission_rate_id: 1,
    _method: "PUT"
  }
  return await axiosInstance.post(`/categories/${id}/edit?`, formData, {
    params: objParams,
   
  })
}

