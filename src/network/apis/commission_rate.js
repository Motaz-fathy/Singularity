import { axiosInstance } from "./index";


export const getAllCommissions = async ({ type, page }) => {
  const params = {
    type: type,
    page: page,
  };
  return await axiosInstance.get("/commissions", { params });
};



export const addCommissionRateRequest = async ({
  commission_rate_name_ar,
  commission_rate_name_en,
  percentage,
  type,
}) => {
  // let objParams = {
  //   "commission_rate_name[ar]": commission_rate_name_ar,
  //   "commission_rate_name[en]": commission_rate_name_en,
  //   percentage:parseInt(percentage),
  //   rate_for: parseInt(type),
  // };
  return await axiosInstance.post(
    `/commissions/store?`,
    {
      "commission_rate_name[ar]": commission_rate_name_ar,
      "commission_rate_name[en]": commission_rate_name_en,
      percentage: parseInt(percentage),
      rate_for: parseInt(type),
    },
    {
      params: {
        "commission_rate_name[ar]": commission_rate_name_ar,
        "commission_rate_name[en]": commission_rate_name_en,
        percentage: Math.floor(percentage),
        rate_for: Math.floor(type),
      },
    }
  );
};

export const editCommissionRequest = async ({
  commission_rate_name_ar,
  commission_rate_name_en,
  percentage,
  type,
  id,
}) => {
  let objParams = {
    "commission_rate_name[ar]": commission_rate_name_ar,
    "commission_rate_name[en]": commission_rate_name_en,
    percentage,
    rate_for: parseInt(type),
    // _method: "PUT",
  };
  return await axiosInstance.put(
    `/commissions/${id}/edit`,
    { objParams },
    {
      params: {
        "commission_rate_name[ar]": commission_rate_name_ar,
        "commission_rate_name[en]": commission_rate_name_en,
        percentage,
        rate_for: parseInt(type),
      },
    }
  );
};
// export const editCommissionRequest = async ({
//   id,
//   category_name_en,
//   category_name_ar,
//   order,
//   status,
//   image,
// }) => {
//   let formData = new FormData();
//   formData.append("image", image);

//   let objParams = {
//     "category_name[ar]": category_name_ar,
//     "category_name[en]": category_name_en,
//     order: order,
//     status: status,
//     commission_rate_id: 1,
//     _method: "PUT",
//   };
//   return await axiosInstance.post(`/categories/${id}/edit?`, formData, {
//     params: objParams,
//   });
// };
