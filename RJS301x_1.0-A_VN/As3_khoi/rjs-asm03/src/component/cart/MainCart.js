import React from "react";
import ListCart from "./ListCart";
import TotalCart from "./TotalCart";
import styles from "./MainCart.module.css";
const MainCart = () => {
  return (
    <div className={styles.container}>
      <ListCart />
      <TotalCart title="cart total" mode="cart" />
    </div>
  );
};
export default MainCart;
