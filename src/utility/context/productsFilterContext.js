import React, { createContext, useState, useContext } from "react"

const ProductFilterContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  const setFilteredParams = values => {
    setFilters(prevData => ({
      ...prevData,
      ...values
    }));
  }

  return (
    <ProductFilterContext.Provider value={{ filters, setFilteredParams }}>
      {children}
    </ProductFilterContext.Provider>
  )
}

export const useProductsFilters = () => useContext(ProductFilterContext)
