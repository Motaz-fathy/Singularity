import {axiosInstance} from "./index"

/****|| subcategories ||****/

export const getAllSubCategories = async params =>
    await axiosInstance.get("/sub_category/all/", {params})

export const getSubCategories = async params =>
    await axiosInstance.get("/sub_category/", {params})

export const getSubCategory = async id => {
    return await axiosInstance.get(`/sub_category/${id}/`)
}
export const createSubCategory = async data => {
    return await axiosInstance.post(`/sub_category/store/`, data)
}

export const updateSubCategory = async (id, data) => {
    return await axiosInstance.post(`/sub_category/${id}/edit/`, data)
}

export const deleteSubCategory = async id => {
    return await axiosInstance.delete(`/sub_category/${id}/`)
}

export const changeSubCategoryActivationStatus = async ({id, status}) =>
    await axiosInstance.put(`/sub_category/${id}/status/`, {}, {params: {status}})

//Get all categories
export const getAllCategories = async () =>
    await axiosInstance.get("/categories/all")

//Get all occasions
export const getOccasionsRequest = async () =>
    await axiosInstance.get("/occasion/")

//Post new subcategory ==> Receives queryParams and image in the body
export const addSubcategoryRequest = async ({
                                                subcategory_name_en,
                                                subcategory_name_ar,
                                                order,
                                                category_id,
                                                status,
                                                image,
                                                occasion,
                                                show_in_happiness_consultant,
                                                happiness_consultant_sort_order
                                            }) => {
    let formData = new FormData()
    formData.append("image", image)

    let objParams = {
        "sub_category_name[ar]": subcategory_name_ar,
        "sub_category_name[en]": subcategory_name_en,
        order,
        category_id,
        status: status,
        occasion,
        commission_rate_id: 1,
        show_in_happiness_consultant,
        happiness_consultant_sort_order
    }
    return await axiosInstance.post(`/sub_category/store/`, formData, {
        params: objParams
    })
}


export const editSubcategoryRequest = async ({
                                                 id,
                                                 subcategory_name_en,
                                                 subcategory_name_ar,
                                                 order,
                                                 category_id,
                                                 status,
                                                 image,
                                                 occasion,
                                                 show_in_happiness_consultant,
                                                 happiness_consultant_sort_order
                                             }) => {

    let formData = new FormData()
    formData.append("image", image)

    let objParams = {
        "sub_category_name[ar]": subcategory_name_ar,
        "sub_category_name[en]": subcategory_name_en,
        order,
        category_id,
        status: status,
        // image,
        occasion,
        commission_rate_id: 1,
        show_in_happiness_consultant,
        happiness_consultant_sort_order,
        _method: "PUT"
    }
    return await axiosInstance.post(`/sub_category/${id}/edit/`, formData, {
        params: objParams
    })
}


export const changeSubCategoryStatus = async (payload) =>
    await axiosInstance.put(
        `/sub_category/${payload.id}/status?status=${payload.status}`
    );
