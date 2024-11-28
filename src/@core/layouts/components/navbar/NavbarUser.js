// ** Dropdowns Imports
import {Fragment} from "react";

// ** Third Party Components
import {Menu} from "react-feather";
import {NavItem, NavLink} from "reactstrap";

import UserDropdown from "./UserDropdown";
import IntlDropdown from "./IntlDropdown";

const NavbarUser = ({ setMenuVisibility }) => {

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none d-flex align-items-center">
        <NavItem className="mobile-menu mr-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <ul className="nav navbar-nav align-items-center ml-auto mr-1">
        <IntlDropdown />
      </ul>
      <ul className="nav navbar-nav align-items-center">
        <UserDropdown />
      </ul>
    </Fragment>
  );
};
export default NavbarUser;
