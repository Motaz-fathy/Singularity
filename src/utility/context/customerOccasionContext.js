import React, { createContext, useState, useContext } from "react";


const FilterContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  const setOrderFilters = (values) => {
    setFilters((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, setOrderFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useOrderFilters = () => useContext(FilterContext);
