import React from "react";
import NavBarItem from "./NavBarItem";
import "./NavBarMain.css";
function NavBarmain() {
  return (
    <div className="container-fluid container-navbar">
      <div className="row m-3">
        <div className="col-md-9 text-light fs-2">BOOKING WEBSITE</div>
        <div className="col-md-3 ">
          <button className="btn btn-light m-1 text-primary">Registered</button>
          <button className="btn btn-light m-1 text-primary">Login</button>
        </div>
      </div>
      <div className="row text-light menu-navbar">
        <NavBarItem></NavBarItem>
      </div>
      <div className="navbar-content text-light ">
        <h1>A lifetime of discounts? It's Genius</h1>
        <p>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button className="btn btn-primary">Sign/Register</button>
      </div>
    </div>
  );
}
export default NavBarmain;
