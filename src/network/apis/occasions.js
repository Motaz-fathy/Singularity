import {axiosInstance} from "./index"

/****|| OCCASION GROUPS ||****/

// Get all occasions groups ==> Receives page number as queryParam
export const requestOccasionsGroups = async page =>
    await axiosInstance.get("/occasion_group/all", {params: {page}})

// Post new  Occasion Group ==> Receives queryParams and image in the body
export const addOccasionGroupRequest = async ({
                                                  image,
                                                  status,
                                                  order,
                                                  occasion_name_en,
                                                  occasion_name_ar
                                              }) => {
    let formData = new FormData()
    formData.append("image", image)
    return await axiosInstance.post(`/occasion_group/store`, formData, {
        params: {
            status,
            order,
            "occasion_group_name[en]": occasion_name_en,
            "occasion_group_name[ar]": occasion_name_ar
        }
    })
}
// Get Assigned Occasion under specific Occasion Group ==> Receives queryParams and id in the url
export const requestGroupAssignedOccasions = async ({id, page}) =>
    await axiosInstance.get(`/occasion_group/${id}/occasions`, {
        params: {page}
    })
// Post filter Occasion Groups ==> Receives queryParams
export const filterOccasionsGroups = async data =>
    await axiosInstance.post("/occasion_group/filter/", {}, {params: data})

// Post edit  Occasion Group ==> Receives queryParams and image in the body
export const editOccasionGroupRequest = async ({
                                                   id,
                                                   image,
                                                   status,
                                                   order,
                                                   occasion_name_en,
                                                   occasion_name_ar
                                               }) => {
    let formData = new FormData()
    formData.append("image", image)
    return await axiosInstance.put(`/occasion_group/edit/${id}`, formData, {
        params: {
            status,
            order,
            "occasion_name[en]": occasion_name_en,
            "occasion_name[ar]": occasion_name_ar
        }
    })
}
//PUT Active / Deactivate  Specific Occasion Group
export const activateDeactivateOccasionGroup = async ({id, status}) =>
    await axiosInstance.put(
        `/occasion_group/status/${id}`,
        {},
        {params: {status}}
    )
//PUT Archive / UnArchive  Specific Occasion Group
export const archiveUnarchiveOccasionGroup = async ({id, status}) =>
    await axiosInstance.put(
        `/occasion_group/archive/${id}`,
        {},
        {params: {archived: status}}
    )
// Get all archived occasions groups ==> Receives page number as queryParam
export const requestArchivedOccasionsGroups = async page =>
    await axiosInstance.get("/occasion_group/archived", {params: {page}})

/****|| OCCASIONS ||****/

// Get all occasions with pagination
export const requestOccasions = async page =>
    await axiosInstance.get("/occasion/all", {params: {page}})

// Post new Occasion  => Receives queryParams and image in the body
export const addOccasionRequest = async ({
                                             image,
                                             status,
                                             order,
                                             occasion_name_en,
                                             occasion_name_ar,
                                             occasion_group_id
                                         }) => {
    let formData = new FormData()
    formData.append("image", image)
    return await axiosInstance.post(`/occasion/store`, formData, {
        params: {
            status,
            order,
            occasion_group_id,
            "occasion_name[en]": occasion_name_en,
            "occasion_name[ar]": occasion_name_ar
        }
    })
}

// Post Filter Occasion ⇒ Receives queryParams
export const filterOccasions = async data =>
    await axiosInstance.post("/occasion/filter/", {}, {params: data})

export const editOccasionRequest = async ({
                                              id,
                                              image,
                                              status,
                                              order,
                                              occasion_name_en,
                                              occasion_name_ar,
                                              occasion_group_id
                                          }) => {
    let formData = new FormData()
    formData.append("image", image)
    return await axiosInstance.post(`/occasion/edit/${id}`, formData, {
        params: {
            status,
            order,
            occasion_group_id,
            "occasion_name[en]": occasion_name_en,
            "occasion_name[ar]": occasion_name_ar,
            _method: "PUT"
        }
    })
}

export const activateDeactivateOccasion = async ({id, status}) =>
    await axiosInstance.put(`/occasion/status/${id}`, {}, {params: {status}})

export const archiveUnarchiveOccasion = async ({id, status}) =>
    await axiosInstance.put(
        `/occasion/archive/${id}`,
        {},
        {params: {archived: status}}
    )
export const requestArchivedOccasions = async page =>
    await axiosInstance.get("/occasion/archived", {params: {page}})
