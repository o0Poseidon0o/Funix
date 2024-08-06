import React from "react";
import "./hotel.css";
import types from "../../data/type.json";

const Hotel = () => {
  return (
    <div className="container">
      <h2>Browse by property type</h2>
      <div className="d-flex justify-content-around">
        {types.map((types) => (
          <div className="types-title">
            <img src={types.image} alt=""></img>
            <h5>{types.name}</h5>
            <p>{types.count} hotels</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Hotel;
