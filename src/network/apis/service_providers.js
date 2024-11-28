import { axiosInstance } from "./index";

/****|| Service Providers ||****/

// Get all ServiceProviders with pagination
export const requestServiceProviders = async (params) =>
  await axiosInstance.get("/sp", { params });

// Post new  Occasion Group ==> Receives queryParams and image in the body
export const addServiceProviderRequest = async ({
  store_name_en,
  store_name_ar,
  country,
  city,
  store_description_en,
  store_description_ar,
  store_main_picture,
  store_pics,
  verify_docs,
  name,
  email,
  password,
  phone,
  active,
  lat,
  lng,
  address_description,
  address,
  block,
  verified,
  has_vat,
  has_delivery_fees,
  delivery_fees,
}) => {
  let formData = new FormData();

  if (store_pics.length > 0) {
    for (let i = 0; i < store_pics.length; i++) {
      formData.append("store_pics[]", store_pics[i]);
    }
  }
  if (verify_docs.length > 0) {
    for (let i = 0; i < verify_docs.length; i++) {
      formData.append("verify_docs[]", verify_docs[i]);
    }
  }
  if (store_main_picture.length > 0) {
    let image = store_main_picture[0];
    formData.append("store_main_picture", image);
  }

  let objWithoutDesc = {
    "store_name[en]": store_name_en,
    "store_name[ar]": store_name_ar,
    country,
    city,
    name,
    email,
    password,
    phone,
    status: active,
    block,
    lat,
    lng,
    address_description,
    address,
    verified,
    has_vat,
    has_delivery_fees,
    delivery_fees,
  };
  let objWithDesc = {
    "store_name[en]": store_name_en,
    "store_name[ar]": store_name_ar,
    "store_description[en]": store_description_en,
    "store_description[ar]": store_description_ar,
    country,
    city,
    name,
    email,
    password,
    phone,
    status: active,
    block,
    lat,
    lng,
    verified,
    address_description,
    address,
    has_vat,
    has_delivery_fees,
    delivery_fees,
  };

  let paramsObject =
    store_description_ar === "" || store_description_en === ""
      ? objWithoutDesc
      : objWithDesc;

  return await axiosInstance.post(`/sp/store`, formData, {
    params: paramsObject,
  });
};

// Put Service Provider ==> Receives queryParams and image in the body
export const editServiceProviderRequest = async (
  {
    store_name_en,
    store_name_ar,
    country,
    city,
    store_description_en,
    store_description_ar,
    store_main_picture,
    store_pics,
    verify_docs,
    name,
    email,
    password,
    phone,
    active,
    lat,
    lng,
    address_description,
    block,
    verified,
    address,
    has_vat,
    has_delivery_fees,
    delivery_fees,
  },
  id
) => {
  let formData = new FormData();

  if (store_main_picture.length > 0) {
    let image = store_main_picture[0];
    formData.append("store_main_picture", image);
  }

  if (store_pics.length > 0) {
    for (let i = 0; i < store_pics.length; i++) {
      formData.append("store_pics[]", store_pics[i]);
    }
  }
  if (verify_docs.length > 0) {
    for (let i = 0; i < verify_docs.length; i++) {
      formData.append("verify_docs[]", verify_docs[i]);
    }
  }

  let paramsObject =
    password === "" || store_description_ar === ""
      ? {
          "store_name[en]": store_name_en,
          "store_name[ar]": store_name_ar,
          "store_description[en]": store_description_en,
          country,
          city,
          name,
          email,
          phone,
          status: active,
          block,
          verified,
          lat,
          lng,
          address_description,
          address,
          has_vat,
          has_delivery_fees,
          delivery_fees,
          _method: "put",
        }
      : {
          "store_name[en]": store_name_en,
          "store_name[ar]": store_name_ar,
          "store_description[en]": store_description_en,
          "store_description[ar]": store_description_ar,
          country,
          city,
          name,
          email,
          password,
          phone,
          status: active,
          block,
          verified,
          lat,
          lng,
          address_description,
          address,
          has_vat,
          has_delivery_fees,
          delivery_fees,
          _method: "put",
        };

  return await axiosInstance.post(`/sp/${id}/edit`, formData, {
    params: paramsObject,
  });
};

//PUT Active / Deactivate  Specific Service Provider
export const activateDeactivateServiceProvider = async ({ id, status }) =>
  await axiosInstance.put(
    `/sp/${id}/change_active/`,
    {},
    { params: { status, _method: "PUT" } }
  );

//PUT Block / Unblock  Specific Service Provider
export const blockUnblockServiceProvider = async ({ id, block }) =>
  await axiosInstance.put(
    `/sp/${id}/change_block/`,
    {},
    { params: { block, _method: "PUT" } }
  );

export const getSingleServiceProvider = async (id) =>
  await axiosInstance.get(`/sp/${id}/view/`);

export const getSingleServiceProviderProfit = async (id) =>
  await axiosInstance.get(`/sp/${id}/states/`);

// Remove Image From SP Images
export const deleteImageFromServiceProvider = async (spId, imageId) =>
  await axiosInstance.delete(`sp/${spId}/image/${imageId}`);


  //PUT Active / Deactivate  Specific Service Provider
  // /sp/55/change_active?status=0&_method=PUT
export const verifyUnVerifyServiceProvider = async ({ id, status }) =>
await axiosInstance.put(
  `/sp/${id}/change_verify/?status=${status}`,
);