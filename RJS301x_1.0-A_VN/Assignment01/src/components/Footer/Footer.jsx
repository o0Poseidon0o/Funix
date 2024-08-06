import React from "react";
import EndFooter from "./endFooter";
import footer from "../../data/footer.json";
import "./Footer.css";

function Footer() {
  return (
    <div className="container-fluid ">
      <div className="hotel-footer">
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals to you</p>
        <input></input>
        <button className="btn btn-primary m-1">Subscribe</button>
      </div>
      <div className="container d-flex">
        {footer.map((col) => (
          <EndFooter key={col.col_number} item={col.col_values}></EndFooter>
        ))}
      </div>
    </div>
  );
}
export default Footer;
