import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateRangePickerComp from "./DateRangePickerComp";

function Header() {
  //Sự kiện khi nhấn btn Search
  const goToSearch = (event) => {
    event.preventDefault();
    window.location.replace("/search");
  };

  return (
    <div className="container-fluid">
      <form className="form-header p-1">
        <FontAwesomeIcon icon={"fa-bed"}></FontAwesomeIcon>
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="Where are you going?"
        ></input>
        <FontAwesomeIcon icon={"fa-calendar-days"}></FontAwesomeIcon>
        <DateRangePickerComp></DateRangePickerComp>

        <FontAwesomeIcon icon={"fa-person"}></FontAwesomeIcon>
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          placeholder="1 aduit 0 children 1 room"
        ></input>
        <button className="btn btn-primary" onClick={goToSearch}>
          Search
        </button>
      </form>
    </div>
  );
}
export default Header;
