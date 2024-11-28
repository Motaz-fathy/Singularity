import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProduct = ({ children }) => {
  const [data, setData] = useState({
    id: 0,
    product_name_ar: "",
    product_name_en: "",
    product_description_ar: "",
    product_description_en: "",
    product_operation_requirement_ar: "",
    product_operation_requirement_en: "",
    product_cancel_policy_description_ar: "",
    product_cancel_policy_description_en: "",
    person_count: 0,
    max_quantity: 0,
    order_before: 0,
    order_before_type: 0,
    service_time: 0,
    service_time_type: 0,
    cancel_before: 0,
    cancel_before_type: 0,
    order: 0,
    status: 0,
    delivery_method_id: 1,
    sub_category_id: 0,
    service_places: [],
    age_groups: [],
    receiver_types: [],
    order_before_id: 1,
    person_count_id: 1,
    price_list_description_ar: "",
    price_list_description_en: "",
    prices: [{ title: { ar: "السعر", en: "price" }, price: "", default: "1" }],
    gender_a: 0,
    gender_b: 0,
    store_id: "",
    main_image: [],
    cover_image: [],
    //
    product_shifts: [],
    shift_details: [],
  });

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
