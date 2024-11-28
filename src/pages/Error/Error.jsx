import React, { useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import errorImg from "@src/assets/images/pages/error.svg";
import { IntlContext } from "../../utility/context/Internationalization";
import themeConfig from "../../configs/themeConfig";

import "@styles/base/pages/page-misc.scss";

const Error = () => {
  const { messages, locale } = useContext(IntlContext);
  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to={`/${locale}/`}>
        <span className="brand-logo">
          <img src={themeConfig.app.appLogoImage} alt="logo" />
        </span>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{messages.GENERAL.PAGE_NOT_FOUND} 🕵🏻‍♀️</h2>
          <p className="mb-2">{messages.GENERAL.URL_NOT_FOUND}</p>
          <Button.Ripple
            tag={Link}
            to={`/${locale}/`}
            color="primary"
            className="btn-sm-block mb-2"
          >
            {messages.GENERAL.BACK_TO_HOME}
          </Button.Ripple>
          <img className="img-fluid" src={errorImg} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export default Error;
