import React, {createContext, useContext, useEffect, useState} from "react"
import {getAllConstants} from "../../network/apis/constants"

const AppConstantsContext = createContext();

export const AppConstantsProvider = ({ children }) => {
  const [constants, setConstants] = useState({})

  const setAppConstants = values => {
    setConstants(prevData => ({
      ...prevData,
      ...values
    }))
  }

  // useEffect(() => {
  //   getAllConstants().then(res => {
  //     setConstants(res.data)
  //   })
  // }, [])

  return (
    <AppConstantsContext.Provider value={{ constants, setAppConstants }}>
      {children}
    </AppConstantsContext.Provider>
  )
}

export const useAppConstants = () => useContext(AppConstantsContext)
