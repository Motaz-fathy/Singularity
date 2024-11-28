import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    store_name_en: "",
    store_name_ar: "",
    country: 1,
    city: "",
    store_main_picture: [],
    store_pics: [],
    verify_docs: [],
    name: "",
    email: "",
    password: "",
    phone: "",
    active: 0,
    verified: 0,
    lat: 0,
    lng: 0,
    address: "",
    address_description: "",
    block: 0,
    enableSave: false,
  });

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return <DataContext.Provider value={{ data, setValues }}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
