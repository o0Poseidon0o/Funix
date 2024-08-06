import React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import City from "../../components/Maincontent/city";
import Hotel from "../../components/Maincontent/hotel";
import Hotelstyles from "../../components/Maincontent/hotelstyle/hotelstyles";

import NavBarmain from "../../components/navBar/NavBarMain";
const Home = () => {
  return (
    <div>
      <NavBarmain></NavBarmain>
      <Header></Header>
      <City></City>
      <Hotel></Hotel>
      <Hotelstyles></Hotelstyles>
      <Footer></Footer>
    </div>
  );
};

export default Home;
