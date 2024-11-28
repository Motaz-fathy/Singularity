import React, { useContext } from "react";
import { IntlContext } from "../../utility/context/Internationalization";
import "./NoDataFound.scss";

const NoDataFound = () => {
  const { messages } = useContext(IntlContext);
  return (
    <div className="no_data_found">
      <p className="label mb-2 text-center">{messages.GENERAL.NO_DATA_FOUND}</p>
    </div>
  );
};

export default NoDataFound;
