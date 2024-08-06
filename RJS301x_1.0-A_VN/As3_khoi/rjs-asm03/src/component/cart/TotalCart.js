import React, { useEffect } from "react";
import styles from "./TotalCart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../redux/store";
import { getFromStorage } from "../../redux/storage";
import { FaGift } from "react-icons/fa";

const TotalCart = ({ mode, title }) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  let currentUser = getFromStorage("current");
  const dispatch = useDispatch();
  useEffect(() => {
    const loading = () => {
      if (currentUser.length > 0) {
        dispatch(cartAction.totalPrice(currentUser[0].total));
      }
    };
    loading();
  }, [dispatch, currentUser]);

  return (
    <>
      {mode === "cart" && (
        <div className={styles.container}>
          <h1>{title}</h1>
          <ul className={styles.content}>
            <li className={styles.subtotal}>
              <p>subtotal</p>
              <p className={styles.num_1}>
                {currentUser.length > 0 && totalPrice
                  ? Number(totalPrice).toLocaleString("vi-VN")
                  : 0}{" "}
                VNĐ
              </p>
            </li>
            <li className={styles.total}>
              <p>total</p>
              <p className={styles.num_2}>
                {currentUser.length > 0 && totalPrice
                  ? Number(totalPrice).toLocaleString("vi-VN")
                  : 0}{" "}
                VNĐ
              </p>
            </li>
          </ul>
          <form className={styles.coupon}>
            <input type="text" placeholder="Enter your coupon"></input>
            <button>
              <FaGift /> Apply conpon
            </button>
          </form>
        </div>
      )}
      {mode === "checkout" && (
        <div className={styles.container_update}>
          <h1>{title}</h1>
          <ul className={styles.content}>
            {currentUser[0].cart.map((items) => (
              <li key={items.id} className={styles.product_list}>
                <p>{items.product}</p>
                <p>
                  {Number(items.total / items.quantity).toLocaleString("vi-VN")}{" "}
                  VNĐ x {items.quantity}
                </p>
              </li>
            ))}
            <li className={styles.total}>
              <p>total</p>
              <p className={styles.num_2}>
                {currentUser.length > 0
                  ? Number(totalPrice).toLocaleString("vi-VN")
                  : 0}{" "}
                VNĐ
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default TotalCart;
