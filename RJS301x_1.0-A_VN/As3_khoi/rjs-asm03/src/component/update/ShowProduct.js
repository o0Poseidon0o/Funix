import React, { useEffect } from "react";
import styles from "./ShowProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../redux/store";
import { getFromStorage } from "../../redux/storage";

const ShowProduct = ({ toggle }) => {
  const cart = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();
  useEffect(() => {
    const loading = () => {
      dispatch(cartAction.loading(getFromStorage("cart")));
    };
    loading();
  }, [dispatch]);

  return (
    <div className={!toggle ? styles.container : styles.non_container}>
      <ul className={styles.content}>
        {cart &&
          cart.map((items) => (
            <li key={items.id} className={styles.items}>
              <div className={styles.image}>
                <img src={items.img} alt={items.product}></img>
              </div>
              <div className={styles.details}>
                <h2>{items.product}</h2>
                <p>{`${Number(items.total / items.quantity).toLocaleString(
                  "vi-VN"
                )} VNĐ x ${items.quantity}`}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ShowProduct;
