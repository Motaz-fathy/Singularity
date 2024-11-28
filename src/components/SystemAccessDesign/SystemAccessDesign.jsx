import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import IntlDropdown from "../../@core/layouts/components/navbar/IntlDropdown";
import themeConfig from "../../configs/themeConfig";
import { IntlContext } from "../../utility/context/Internationalization";

const SystemAccessDesign = ({ renderContent }) => {
  const { locale } = useContext(IntlContext);
  const illustration = "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <div>
          <Link className="brand-logo" to={`/${locale}/`}>
            <span className="brand-logo">
              <img src={themeConfig.app.appLogoImage} alt="logo" />
            </span>
          </Link>
        </div>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="7" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="5"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <ul className="nav navbar-nav align-items-end mb-2">
              <IntlDropdown />
            </ul>
            {renderContent()}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default SystemAccessDesign;

SystemAccessDesign.propTypes = {
  renderContent: PropTypes.func.isRequired,
};
