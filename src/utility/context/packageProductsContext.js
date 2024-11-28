import React, { useState, useContext } from "react";
import { dispatchSnackbarSuccess } from "../Utils";
import { IntlContext } from "./Internationalization";

const PackageProductsContext = React.createContext(() => {});

const PackageProductsProvider = ({ children }) => {
  const [productsIds, setProductsIds] = useState([]);
  const { messages, locale } = useContext(IntlContext);
  const updateProductsIdsList = (arr) => {
    setProductsIds((currentIds) => [...currentIds, ...arr]);
  };

  const addNewId = (product, id) => {
    const ids = productsIds.map((item) => item.product_id);
    if (ids.includes(id)) {
      setProductsIds((currentIds) => currentIds);
    } else {
      setProductsIds((currentIds) => [...currentIds, product]);
      dispatchSnackbarSuccess({
        msg: messages.PACKAGES.ADDED_PRODUCT_MSG,
        isMsgKey: false,
      });
    }
  };

  const removeSinglePackage = (id) => {
    let updatedArray = productsIds.filter((item) => item.id !== id);
    setProductsIds(updatedArray);
  };

  const removeSingleProductWithId = (id) => {
    let updatedArray = productsIds.filter((item) => item.id !== id);

    setProductsIds(updatedArray);
  };

  const clearAllPackages = () => {
    setProductsIds([]);
    updateProductsIdsList([]);
  };

  return (
    <PackageProductsContext.Provider
      value={{
        productsIds,
        addNewId,
        removeSinglePackage,
        updateProductsIdsList,
        clearAllPackages,
        removeSingleProductWithId,
      }}
    >
      {children}
    </PackageProductsContext.Provider>
  );
};

export { PackageProductsProvider, PackageProductsContext };
