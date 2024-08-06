import React from "react";
import styles from "./MainCheckout.module.css";
import CheckoutForm from "./CheckoutForm";
import TotalCart from "../cart/TotalCart";
const MainCheckout = () => {
  return (
    <div className={styles.container}>
      <CheckoutForm />
      <TotalCart mode="checkout" title="your order" />
    </div>
  );
};

export default MainCheckout;
