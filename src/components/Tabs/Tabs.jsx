import React from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from "reactstrap";
import "./Tabs.scss";

const Tabs = ({ tabsArr, activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills vertical>
      {tabsArr && tabsArr.map((tab, i) => (
        <NavItem key={i} className={tab.navItemClass}>
          <NavLink
            className={tab.navLinkClass}
            active={activeTab === tab.id}
            onClick={() => toggleTab(tab.id)}
          >
            {tab.icon ? tab.icon : ""}
            <span className={tab.titleClass}>{tab.title}</span>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default Tabs;

Tabs.propTypes = {
  tabsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTab: PropTypes.string.isRequired,
  toggleTab: PropTypes.func.isRequired,
};
