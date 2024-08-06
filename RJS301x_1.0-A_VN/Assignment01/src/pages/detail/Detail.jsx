import React from "react";
import DetailHotel from "../../components/DetailHotel/DetailHotel";
import NavBarmain from "../../components/navBar/NavBarMain";
import Footer from "../../components/Footer/Footer";

const Detail = () => {
  return (
    <div>
      <NavBarmain></NavBarmain>

      <DetailHotel></DetailHotel>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
