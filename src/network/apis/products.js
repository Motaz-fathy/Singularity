import {axiosInstance} from "./index";

/****|| Products ||****/

// Get all sub categories
export const getSubcategoriesRequest = async () =>
    await axiosInstance.get("/sub_category/all/");

// Get all Products with pagination
export const allProducts = async (params) =>
    await axiosInstance.get("/products", {params});

//PUT Active / Deactivate  Specific Product
export const activateDeactivateProduct = async ({id, status}) =>
    await axiosInstance.put(
        `/products/${id}/change_active/`,
        {},
        {params: {status, _method: "PUT"}}
    );

// Post new  Product ==> Receives queryParams and image in the body
export const addProduct = async ({
                                     product_name_ar,
                                     product_name_en,
                                     product_description_ar,
                                     product_description_en,
                                     product_operation_requirement_ar,
                                     product_operation_requirement_en,
                                     product_cancel_policy_description_ar,
                                     product_cancel_policy_description_en,
                                     person_count,
                                     min_quantity,
                                     max_quantity = 4,
                                     shift_details_1,
                                     shift_details_2,
                                     shift_details_3,
                                     product_shifts,
                                     order_before,
                                     order_before_type,
                                     service_time,
                                     service_time_type,
                                     cancel_before,
                                     cancel_before_type,
                                     order,
                                     status,
                                     delivery_method_id,
                                     sub_category_id,
                                     service_places,
                                     age_groups,
                                     receiver_types,
                                     order_before_id,
                                     person_count_id,
                                     price_list_description_ar,
                                     price_list_description_en,
                                     prices,
                                     gender_a = 0,
                                     gender_b = 0,
                                     store_id,
                                     main_image,
                                     cover_image,
                                     show_in_happiness_consultant
                                 }) => {
    let formData = new FormData();
    if (cover_image.length > 0) {
        for (let i = 0; i < cover_image.length; i++) {
            formData.append("cover_image[]", cover_image[i]);
        }
    }
    if (main_image.length > 0) {
        for (let i = 0; i < main_image.length; i++) {
            formData.append("main_image", main_image[i]);
        }
    }

    let objParams = {
        "product_name[ar]": product_name_ar,
        "product_name[en]": product_name_en,
        "product_operation_requirement[ar]": product_operation_requirement_ar,
        "product_operation_requirement[en]": product_operation_requirement_en,
        show_in_happiness_consultant,
        person_count,
        max_quantity: 4,
        "shift_details[1]": JSON.stringify(shift_details_1),
        "shift_details[2]": JSON.stringify(shift_details_2),
        "shift_details[3]": JSON.stringify(shift_details_3),
        product_shifts: JSON.stringify(product_shifts),
        order_before,
        order_before_type,
        service_time: service_time || 0,
        service_time_type: service_time_type || 0,
        cancel_before,
        cancel_before_type,
        order,
        status: status,
        delivery_method_id,
        sub_category_id,
        service_places: service_places,
        age_groups: age_groups,
        receiver_types: receiver_types,
        order_before_id,
        person_count_id,

        "gender[1]": gender_a || 0,
        "gender[2]": gender_b || 0,
        store_id,
        main_image,
        "cover_image[]": cover_image,
        min_quantity
    };

    if (!objParams.service_time || !objParams.service_time_type) {
        delete objParams.service_time;
        delete objParams.service_time_type;
    }

    formData.append("prices", JSON.stringify(prices));formData.append("price_list_description[ar]", price_list_description_ar);
    formData.append("price_list_description[en]", price_list_description_en);
    formData.append("product_description[ar]", product_description_ar);
    formData.append("product_description[en]", product_description_en);
    formData.append(
        "product_cancel_policy_description[ar]",
        product_cancel_policy_description_ar
    );
    formData.append(
        "product_cancel_policy_description[en]",
        product_cancel_policy_description_en
    );

    return await axiosInstance.post(`/products/store`, formData, {
        params: objParams,
    });
};

//Get single  Product with Specific id
export const getSingleProduct = async (id) =>
    await axiosInstance.get(`/products/${id}/`);

export const getSingleProductRequest = async (id) =>
    await axiosInstance.get(`/products/requests/${id}/`);
// edit product
export const editProduct = async ({
                                      id,
                                      product_name_ar,
                                      product_name_en,
                                      product_description_ar,
                                      product_description_en,
                                      product_operation_requirement_ar,
                                      product_operation_requirement_en,
                                      product_cancel_policy_description_ar,
                                      product_cancel_policy_description_en,
                                      person_count,
                                      max_quantity = 4,
                                      min_quantity,
                                      shift_details_1,
                                      shift_details_2,
                                      shift_details_3,

                                      product_shifts,
                                      order_before,
                                      order_before_type,
                                      service_time,
                                      service_time_type,
                                      cancel_before,
                                      cancel_before_type,
                                      order,
                                      status,
                                      delivery_method_id,
                                      sub_category_id,
                                      service_places,
                                      age_groups,
                                      receiver_types,
                                      order_before_id,
                                      person_count_id,
                                      price_list_description_ar,
                                      price_list_description_en,
                                      prices,
                                      gender_a = 0,
                                      gender_b = 0,
                                      store_id,
                                      main_image,
                                      cover_image,
                                      show_in_happiness_consultant
                                  }) => {
    console.log("---prices----", prices);let formData = new FormData();
    if (cover_image.length > 0) {
        for (let i = 0; i < cover_image.length; i++) {
            formData.append("cover_image[]", cover_image[i]);
        }
    }
    if (main_image.length > 0) {
        for (let i = 0; i < main_image.length; i++) {
            formData.append("main_image", main_image[i]);
        }
    }

    let objParams = {
        "product_name[ar]": product_name_ar,
        "product_name[en]": product_name_en,
        "product_operation_requirement[ar]": product_operation_requirement_ar,
        "product_operation_requirement[en]": product_operation_requirement_en,
        person_count,
        "shift_details[1]": JSON.stringify(shift_details_1),
        "shift_details[2]": JSON.stringify(shift_details_2),
        "shift_details[3]": JSON.stringify(shift_details_3),
        product_shifts: JSON.stringify(product_shifts),
        show_in_happiness_consultant,
        max_quantity: 4,
        min_quantity,
        order_before,
        order_before_type,
        service_time: service_time || 0,
        service_time_type: service_time_type || 0,
        cancel_before,
        cancel_before_type,
        order,
        status: status,
        delivery_method_id,
        sub_category_id,
        service_places: service_places,
        age_groups: age_groups,
        receiver_types: receiver_types,
        order_before_id,
        person_count_id,

        prices: JSON.stringify(prices),
        "gender[1]": gender_a || 0,
        "gender[2]": gender_b || 0,
        store_id,
        main_image,
        "cover_image[]": cover_image,
    };

    if (!objParams.service_time || !objParams.service_time_type) {
        delete objParams.service_time;
        delete objParams.service_time_type;
    }
    formData.append("price_list_description[ar]", price_list_description_ar);
    formData.append("price_list_description[en]", price_list_description_en);
    formData.append("product_description[ar]", product_description_ar);
    formData.append("product_description[en]", product_description_en);
    formData.append(
        "product_cancel_policy_description[ar]",
        product_cancel_policy_description_ar
    );
    formData.append(
        "product_cancel_policy_description[en]",
        product_cancel_policy_description_en
    );
    formData.append("_method", "put");

    return await axiosInstance.post(`/products/${id}/edit/`, formData, {
        params: objParams,
    });
};

// Remove Image From Products Images
export const deleteImageFromProduct = async (productId, imageId) =>
    await axiosInstance.delete(`products/${productId}/image/${imageId}`);
