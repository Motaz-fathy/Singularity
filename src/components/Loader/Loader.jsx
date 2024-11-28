import React from "react";
import { Spinner } from "reactstrap";
import "./Loader.scss";

const Loader = () => {
  return (
    <>
      <div className="spinner_container">
        <Spinner color="primary" />
      </div>
    </>
  );
};

export default Loader;
