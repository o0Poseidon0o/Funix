import React from "react";
import hotelstylelist from "../../../data/hotel_list.json";
import Hotelstyle from "./hotelstyle";

const Hotelstyles = () => {
  return (
    <div className="container p-1">
      <h3>Homes guests love</h3>
      <div className="d-flex justify-content-around">
        {hotelstylelist.map((hotels) => {
          return <Hotelstyle key={hotels.name} item={hotels}></Hotelstyle>;
        })}
      </div>
    </div>
  );
};
export default Hotelstyles;
