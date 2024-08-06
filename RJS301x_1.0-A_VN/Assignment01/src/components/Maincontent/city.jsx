import React from "react";
import "./city.css";
import city from "../../data/city.json";

const City = () => {
  return (
    <div className="container">
      <div className="row">
        {/* Lay tu json city tung phan tu */}
        {city.map((city) => (
          <div className="city col-md-4 py-5">
            <img src={city.image} alt=""></img>
            <div className="content">
              <p>{city.name}</p>
              <p className="fs-3">{city.subText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default City;
