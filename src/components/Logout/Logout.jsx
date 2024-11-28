import React, { useContext } from "react";
import { Power } from "react-feather";
import { IntlContext } from "../../utility/context/Internationalization";

const Logout = ({ onLogout }) => {
  const { messages } = useContext(IntlContext);

  return (
    <>
      <div
        className="logout_container"
        onClick={(e) => {
          e.stopPropagation();
          onLogout();
        }}
      >
        <Power size={14} className="mr-75" />
        <span className="align-middle">{messages.LOGOUT.LOGOUT}</span>
      </div>
    </>
  );
};

export default Logout;
