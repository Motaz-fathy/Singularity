// ** React Imports
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

// ** Third Party Components
import ReactCountryFlag from "react-country-flag";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

// ** Internationalization Context
import { IntlContext } from "../../../../utility/context/Internationalization";

const IntlDropdown = () => {
  // ** Context
  const intlContext = useContext(IntlContext);
  const history = useHistory();
  const location = useLocation();
  // ** Vars
  const langObj = {
    en: "English",
    ar: "العربية"
  };

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault();
    console.log({ lang });
    intlContext.switchLanguage(lang);
    const pathname = history.location.pathname;
    history.push({
      pathname: pathname.replace(/en|ar/, lang),
      search: location.search,
      state: location.state
    });
  };

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={e => e.preventDefault()}
      >
        {/* 
       
               <ReactCountryFlag
          className="country-flag flag-icon"
          countryCode={intlContext.locale === "en" ? "us" : "sa"}
          svg
        />
        <span className="selected-language">{langObj[intlContext.locale]}</span>
        
       */}
      </DropdownToggle>
      <DropdownMenu className="mt-0" right>
        <DropdownItem href="/" tag="a" onClick={e => handleLangUpdate(e, "en")}>
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ml-1">English</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={e => handleLangUpdate(e, "ar")}>
          <ReactCountryFlag className="country-flag" countryCode="sa" svg />
          <span className="ml-1">العربية</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default IntlDropdown;
