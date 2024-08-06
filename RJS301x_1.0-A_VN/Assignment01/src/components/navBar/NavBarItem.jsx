import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // Đọc file JSON
// // --------------Cách 1------------------
// const navBar = require("../../../data/navBar.json");
// // ------------cách 2------------
import navBar from "../../data/navBar.json";
const NavBarItem = () => {
  return navBar.map((item) => (
    <div className="col fs-5" key={item.style}>
      <FontAwesomeIcon icon={`fa-solid ${item.icon}`}></FontAwesomeIcon>
      {item.type}
    </div>
  ));
};
export default NavBarItem;
