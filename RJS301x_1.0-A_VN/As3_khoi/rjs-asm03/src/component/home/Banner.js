import React from "react";
import banner from "../../images/banner1.jpg";
import styles from "./Banner.module.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {

  const navigate = useNavigate();
  const onClickHandler = () => {
    return navigate("/shop/categories");
  };
  return (
    <div className={styles.container}>
      <img src={banner} alt="banner"></img>
      <div className={styles.content}>
        <h2>NEW INSPIRATION 2020</h2>
        <h1>20% OFF ON NEW SEASON</h1>
        <button onClick={onClickHandler}>Browser Collections</button>
      </div>
    </div>
  );
};

export default Banner;
