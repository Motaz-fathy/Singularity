import React, { createContext, useState, useContext } from "react";

const CustomersFilterContext = createContext();

export const CustomersProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
 
  const setFilteredParams = (values) => {
    setFilters((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <CustomersFilterContext.Provider value={{ filters, setFilteredParams }}>
      {children}
    </CustomersFilterContext.Provider>
  );
};

export const useCustomersFilters = () => useContext(CustomersFilterContext);
