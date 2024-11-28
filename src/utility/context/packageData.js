import React, {createContext, useState, useContext} from "react";

const PackageDataContext = createContext({});

export const PackageData = ({children}) => {
    const [data, setData] = useState({
        id: null,
        package_name_ar: "",
        package_name_en: "",
        package_description_ar: "",
        package_description_en: "",
        package_operation_requirement_ar: "",
        package_operation_requirement_en: "",
        package_cancel_policy_description_ar: "",
        package_cancel_policy_description_en: "",
        person_count: 0,
        order_before: 0,
        order_before_type: 0,
        service_time: 0,
        service_time_type: 0,
        cancel_before: 0,
        cancel_before_type: 0,
        order: 0,
        status: 0,
        service_places: [],
        age_groups: [],
        receiver_types: [],
        occasion: [],
        product: [],
        max_quantity: 0,
        delivery_method_id: 1,
        sub_category_id: 0,
        order_before_id: 1,
        person_count_id: 1,
        store_id: "",
        main_image: [],
        cover_image: [],
        country_id: ""
    });

    const setValues = (values) => {
        setData((prevData) => ({
            ...prevData,
            ...values,
        }));
    };

    return (
        <PackageDataContext.Provider value={{data, setValues}}>
            {children}
        </PackageDataContext.Provider>
    );
};

export const useData = () => useContext(PackageDataContext);
