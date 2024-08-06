import React from "react";
import ShopCategories from "../shop/ShopCategories";
import ShopProductList from "../shop/ShopProductList";
import styles from "./ShopProduct.module.css";

const ShopProduct = ({ data }) => {
  return (
    <div className={styles.container}>
      <ShopCategories />
      <ShopProductList data={data} />
    </div>
  );
};
export default ShopProduct;
