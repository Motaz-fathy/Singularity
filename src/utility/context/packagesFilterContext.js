import React, { createContext, useState, useContext } from "react"

const PackageFilterContext = createContext()

export const PackagesProvider = ({ children }) => {
  const [filters, setFilters] = useState({})

  const setFilteredParams = values => {
    setFilters(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <PackageFilterContext.Provider value={{ filters, setFilteredParams }}>
      {children}
    </PackageFilterContext.Provider>
  )
}

export const usePackagesFilters = () => useContext(PackageFilterContext)
