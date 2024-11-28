
import React, { createContext, useState, useContext } from "react"

const ReviewsContext = createContext()

export const ReviewsProvider = ({ children }) => {
  const [filters, setFilters] = useState({})

  const setFilteredParams = values => {
    setFilters(prevData => ({
      ...prevData,
      ...values
    }))
  }

  return (
    <ReviewsContext.Provider value={{ filters, setFilteredParams }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviewsFilters = () => useContext(ReviewsContext)
