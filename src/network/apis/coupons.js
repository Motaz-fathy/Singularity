import { axiosInstance } from "./index";

/****|| Packages ||****/

// Get all Products with pagination
export const requestCoupons = async (params) =>
  await axiosInstance.get("/coupons", { params });

//PUT block / unblock  Specific customer

  export const changeCouponsStatus = async ({id,status}) =>{
    await axiosInstance.put(
      `/coupons/${id}/change_status?status=${status}`
    );
  }
export const addCuopon = async (values) => {

  const {
    coupon_name_ar,
    coupon_name_en,
    coupon_description_ar,
    coupon_description_en,
    ...newValues
  } = values;

  return await axiosInstance.post(
    `/coupons/store?`,
    {
      ...newValues,
      "coupon_name[en]": values.coupon_name_en,
      "coupon_name[ar]": values.coupon_name_ar,

      "coupon_description[ar]": values.coupon_description_ar,

      "coupon_description[en]": values.coupon_description_en,
    },
    {
      params: {
        ...newValues,
        "coupon_name[en]": values.coupon_name_en,
        "coupon_name[ar]": values.coupon_name_ar,

        "coupon_description[ar]": values.coupon_description_ar,

        "coupon_description[en]": values.coupon_description_en,
      },
    }
  );
};



export const editCouponsRequest = async ({
  id,
  coupon_name_en,
  coupon_name_ar,
  coupon_description_ar,
  coupon_description_en,
  code,
  start_date,
  end_date,
  status,
  max_users,
  max_for_user,
  min_order_price,
  discount_type,
  discount_value,
  max_discount_value,
  type,
  ...data
}) => {
 
  let objParams = {
    "coupon_name[ar]": coupon_name_ar,
    "coupon_name[en]": coupon_name_en,
    "coupon_description[ar]": coupon_description_ar,
    "coupon_description[en]": coupon_description_en,
    code,
    start_date: start_date,
    end_date: end_date,
    status,
    max_users,
    max_for_user,
    min_order_price,
    type,
    discount_value,
    max_discount_value,
  };

  return await axiosInstance.put(
    `/coupons/${id}/edit?`,
    {
      // ...newValues,
      "coupon_name[en]": coupon_name_en,
      "coupon_name[ar]": coupon_name_ar,

      "coupon_description[ar]": coupon_description_ar,

      "coupon_description[en]": coupon_description_en,
      code,
      start_date: start_date,
      end_date: end_date,
      status,
      max_users,
      max_for_user,
      min_order_price,
      type,
      discount_value:parseInt(discount_value),
      max_discount_value,
    },
    {
      params: objParams,
    }
  );
};

//-----------Way To Handle Edit Req------------------//
// export const editCouponsRequest = async (values, id) => {
//   const {
//     coupon_name_ar,
//     coupon_name_en,
//     coupon_description_ar,
//     coupon_description_en,
//     ...newValues
//   } = values;
//   return await axiosInstance.put(
//     `/coupons/${id}/edit?`,
//     {
//       ...newValues,
//       "coupon_name[en]": values.coupon_name_en,
//       "coupon_name[ar]": values.coupon_name_ar,

//       "coupon_description[ar]": values.coupon_description_ar,

//       "coupon_description[en]": values.coupon_description_en,
//     },
//     {
//       ...newValues,
//       "coupon_name[en]": values.coupon_name_en,
//       "coupon_name[ar]": values.coupon_name_ar,

//       "coupon_description[ar]": values.coupon_description_ar,

//       "coupon_description[en]": values.coupon_description_en,
//     }
//   );
// };

//-----------Way To Handle Edit Req END------------------//
