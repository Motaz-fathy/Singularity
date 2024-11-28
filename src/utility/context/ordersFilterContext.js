import React, {createContext, useContext, useState} from "react"

const FilterContext = createContext()

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    status: -1
  })

  const setOrderFilters = values => {
    setFilters(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <FilterContext.Provider value={{ filters, setOrderFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useOrderFilters = () => useContext(FilterContext)
