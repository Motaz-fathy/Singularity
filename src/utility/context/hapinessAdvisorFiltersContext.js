
import React, { createContext, useState, useContext } from "react"

const HapinessAdvisorFilterContext = createContext()

export const HapinessAdvisorProvider = ({ children }) => {
  const [filters, setFilters] = useState({})

  const setFilteredParams = values => {
    setFilters(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <HapinessAdvisorFilterContext.Provider value={{ filters, setFilteredParams }}>
      {children}
    </HapinessAdvisorFilterContext.Provider>
  )
}

export const useHapinessAdvisorFilters = () => useContext(HapinessAdvisorFilterContext)
