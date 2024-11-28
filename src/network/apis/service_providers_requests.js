import {axiosInstance} from "./index";

/****|| Service Providers Requests ||****/

// Get all ServiceProviders Requests with pagination
export const requestServiceProvidersRegRequests = async (params) =>
    await axiosInstance.get("/sp/reg_requests/", {params});

// Put Service Provider Requests ==> Receives queryParams and image in the body
export const editServiceProviderRegisterRequest = async (
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
        address,
        address_description,
        block,
        verified,
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

    let paramsObject = {
        "store_name[en]": store_name_en,
        "store_name[ar]": store_name_ar,
        "store_description[en]": store_description_en,
        "store_description[ar]": store_description_ar,
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
        address,
        address_description,
        has_vat,
        has_delivery_fees,
        delivery_fees,
        _method: "put",
    };
    if (password) {
        paramsObject.password = password;
    }

    return await axiosInstance.post(`/sp/reg_request/${id}/edit`, formData, {
        params: paramsObject,
    });
};

// change SP request status to approve
export const ApproveStatusSpRegRequest = async (id) =>{
return await axiosInstance.put(`sp/${id}/change_request_status`, {
    status: 1
})
};

// change SP request status to reject
export const RejectStatusSpRegRequest = async (id) =>{
return await axiosInstance.put(`sp/${id}/change_request_status`, {
    status: 0
})};

export const ChangeStatusSpRegRequest = async (id, status) => {
    return await axiosInstance.put(`sp/${id}/change_request_status`, {
        status
    });
};
