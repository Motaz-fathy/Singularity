import {axiosInstance} from "./index";

/****|| Packages ||****/

// Get all occasion with pagination
export const requestOccasions = async () =>
    await axiosInstance.get("/occasion/all");

// Get all Products with pagination
export const requestPackages = async (params) =>
    await axiosInstance.get("/packages", {params});

// Remove Product From package
export const deleteProductFromPackage = async ({packageId, productId}) =>
    await axiosInstance.delete(`packages/${packageId}/product/${productId}`);

// Remove Image From package Images
export const deleteImageFromPackage = async (packageId, imageId) =>
    await axiosInstance.delete(`packages/${packageId}/image/${imageId}`);

//PUT Active / Deactivate  Specific Package
export const activateDeactivatePackage = async ({id, status}) =>
    await axiosInstance.put(
        `/packages/${id}/status/`,
        {},
        {params: {status, _method: "PUT"}}
    );

//Get single  Product with Specific id
export const getSinglePackage = async (id) =>
    await axiosInstance.get(`/packages/${id}/view`);

// edit package
export const addPackageRequest = async ({
                                            id,
                                            package_name_ar,
                                            package_name_en,
                                            package_description_ar,
                                            package_description_en,
                                            package_operation_requirement_ar,
                                            package_operation_requirement_en,
                                            package_cancel_policy_description_ar,
                                            package_cancel_policy_description_en,
                                            person_count,
                                            max_quantity,
                                            order_before,
                                            order_before_type,
                                            service_time,
                                            service_time_type,
                                            cancel_before,
                                            cancel_before_type,
                                            order,
                                            status,
                                            service_places,
                                            product,
                                            age_groups,
                                            occasion,
                                            receiver_types,
                                            main_image,
                                            cover_image,
                                            country_id
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
        "package_name[ar]": package_name_ar,
        "package_name[en]": package_name_en,
        "package_description[ar]": package_description_ar,
        "package_description[en]": package_description_en,
        "package_operation_requirement[ar]": package_operation_requirement_ar,
        "package_operation_requirement[en]": package_operation_requirement_en,
        "package_cancel_policy_description[ar]":
        package_cancel_policy_description_ar,
        "package_cancel_policy_description[en]":
        package_cancel_policy_description_en,
        person_count,
        max_quantity,
        order_before,
        order_before_type,
        service_time: service_time || 0,
        service_time_type: service_time_type || 0,
        cancel_before,
        cancel_before_type,
        order,
        status: status,
        service_places: service_places,
        product: product,
        age_groups: age_groups,
        occasion: occasion,
        receiver_types: receiver_types,
        main_image,
        "cover_image[]": cover_image,
        country_id
    };

    if (!objParams.service_time || !objParams.service_time_type) {
        delete objParams.service_time;
        delete objParams.service_time_type;
    }

    return await axiosInstance.post(`/packages/store/`, formData, {
        params: objParams,
    });
};

// edit package
export const editPackageRequest = async ({
                                             id,
                                             package_name_ar,
                                             package_name_en,
                                             package_description_ar,
                                             package_description_en,
                                             package_operation_requirement_ar,
                                             package_operation_requirement_en,
                                             package_cancel_policy_description_ar,
                                             package_cancel_policy_description_en,
                                             person_count,
                                             max_quantity,
                                             order_before,
                                             order_before_type,
                                             service_time,
                                             service_time_type,
                                             cancel_before,
                                             cancel_before_type,
                                             order,
                                             status,
                                             service_places,
                                             product,
                                             age_groups,
                                             occasion,
                                             receiver_types,
                                             main_image,
                                             cover_image,
                                             price,
                                             country_id
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
        "package_name[ar]": package_name_ar,
        "package_name[en]": package_name_en,
        "package_description[ar]": package_description_ar,
        "package_description[en]": package_description_en,
        "package_operation_requirement[ar]": package_operation_requirement_ar,
        "package_operation_requirement[en]": package_operation_requirement_en,
        "package_cancel_policy_description[ar]":
        package_cancel_policy_description_ar,
        "package_cancel_policy_description[en]":
        package_cancel_policy_description_en,
        person_count,
        max_quantity,
        order_before,
        order_before_type,
        service_time: service_time || 0,
        service_time_type: service_time_type || 0,
        cancel_before: cancel_before,
        cancel_before_type: cancel_before_type,
        order,
        price: price,
        status: status,
        service_places: service_places,
        product: product,
        age_groups: age_groups,
        occasion: occasion,
        receiver_types: receiver_types,
        main_image,
        "cover_image[]": cover_image,
        country_id
    };

    if (!objParams.service_time || !objParams.service_time_type) {
        delete objParams.service_time;
        delete objParams.service_time_type;
    }

    return await axiosInstance.post(`/packages/${id}/edit/`, formData, {
        params: objParams,
    });
};
