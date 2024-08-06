//Khai báo thư viện
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./DetailHeader.css";

//Cấu trúc phần header của component detail
const DetailHeader = (props) => {
  return (
    <div className="detail-header">
      <div>
        <h3>{props.item.name}</h3>
        <p>
          <FontAwesomeIcon icon="fa-location-dot" /> {props.item.address}
        </p>
        <p>{props.item.distance}</p>
        <p>{props.item.price}</p>
      </div>
      <button>Reserve or Book Now!</button>
    </div>
  );
};

export default DetailHeader;
