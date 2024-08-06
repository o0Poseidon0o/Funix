import React from "react";
import "./RenderPhoto.css";
// Cấu trúc component photo detail
const RenderPhoto = (props) => {
  return (
    <div className="container-fluid image">
      {props.item.map((image) => (
        <img src={image} alt=""></img>
      ))}
    </div>
  );
};

export default RenderPhoto;
