import React from "react";
import iphone from "../../images/product_1.png";
import imac from "../../images/product_2.png";
import ipad from "../../images/product_3.png";
import watch from "../../images/product_4.png";
import airpod from "../../images/product_5.png";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Carefull create collections</p>
        <p>Browse our categories</p>
      </div>
      <ul className={styles.categories}>
        <li>
          <Link
            to={"/shop/iphone"}
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={iphone} alt="iphone"></img>
          </Link>
        </li>
        <li>
          <Link
            to={"/shop/macbook"}
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={imac} alt="imac"></img>
          </Link>
        </li>
      </ul>
      <ul className={styles.categories_1}>
        <li>
          <Link
            to={"/shop/ipad"}
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={ipad} alt="iphone"></img>
          </Link>
        </li>
        <li>
          <Link
            to={"/shop/watch"}
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={watch} alt="imac"></img>
          </Link>
        </li>
        <li>
          <Link
            to={"/shop/airpod"}
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={airpod} alt="imac"></img>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Categories;
