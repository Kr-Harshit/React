import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./Sidebar.css";
import image from "../../../images/icon.png";
// import NavItem from "./NavItem";

export default function Sidebar(props) {
  let match = useRouteMatch();

  const navItems = [
    "Kitchen",
    "Dashboard",
    "Menu",
    "User",
    "Orders",
    "Promotions",
    "Banners",
    "Finances",
    "Reports",
  ];

  const [activeOption, setActiveOption] = useState("");

  const activeOptionHandler = (event) => {
    const selectedOption = event.target.innerHTML;
    setActiveOption(selectedOption);
    props.getActiveOption(selectedOption);
  };

  const navItemElement = navItems.map((navItem) => {
    if (navItem === activeOption) {
      return (
        <Link
          key={navItem}
          to={`${match.url}/${navItem.toLowerCase()}`}
          className="nav-item active"
          onClick={activeOptionHandler}
        >
          {navItem}
        </Link>
      );
    } else
      return (
        <Link
          key={navItem}
          to={`${match.url}/${navItem.toLowerCase()}`}
          className="nav-item"
          onClick={activeOptionHandler}
        >
          {navItem}
        </Link>
      );
  });

  // console.log(navItemElement);

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={image} alt="company-logo" />
      </div>
      <div className="sidebar-navbar">{navItemElement}</div>
    </div>
  );
}
