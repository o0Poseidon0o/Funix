import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailsProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../redux/store";
import { getFromStorage } from "../../redux/storage";
const DetailsProduct = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const param = useParams();
  const product = data.filter((items) => items._id.$oid === param.productId);
  const items = product[0];
  const onDecrementHandler = () => {
    dispatch(cartAction.decrement());
  };
  const onIncrementHandler = () => {
    dispatch(cartAction.increment());
  };
  const addToCartHandler = () => {
    const currentArr = getFromStorage("current");
    if (currentArr.length > 0) {
      dispatch(
        cartAction.addToCart({
          id: items._id.$oid,
          product: items.name,
          quantity,
          total: Number(items.price),
          img: items.img1,
        })
      );
      navigate("/carts");
    } else {
      alert("Bạn cần đăng nhập để sử dụng tính năng này");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <h1>{items.name}</h1>
      <h2>{Number(items.price).toLocaleString("vi-VN")} VNĐ</h2>
      <p className={styles.desc}>{items.short_desc}</p>
      <div className={styles.category}>
        <h3>category:</h3>
        <p>{items.category}s</p>
      </div>
      <div className={styles.cart}>
        <div className={styles.box}>
          <p>quantity </p>
          <div className={styles.quantity}>
            <button
              onClick={onDecrementHandler}
              disabled={quantity === 1 ? true : false}
              className={quantity === 1 ? styles.btn_stop : undefined}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 256 512"
              >
                <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
              </svg>
            </button>
            <p>{quantity}</p>
            <button onClick={onIncrementHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 256 512"
              >
                <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
              </svg>
            </button>
          </div>
        </div>
        <button onClick={addToCartHandler}>Add to cart</button>
      </div>
    </div>
  );
};
export default DetailsProduct;
