import React, { useEffect } from "react";
import styles from "./ListCart.module.css";
import { getFromStorage } from "../../redux/storage";
import { useDispatch } from "react-redux";
import { cartAction } from "../../redux/store";
import { useSelector } from "react-redux";
const ListCart = ({ data }) => {
  const count = useSelector((state) => state.cart.count);

  const dispatch = useDispatch();

  useEffect(() => {
    const loading = () => {
      dispatch(cartAction.loading(getFromStorage("cart")));
    };
    loading();
  }, [dispatch]);

  const updateDecrementHandler = (id, quantity, price) => {
    dispatch(cartAction.updateDecrement({ newQuantity: quantity, id, price }));
    dispatch(cartAction.loading(getFromStorage("cart")));
  };
  const updateIncrementHandler = (id, quantity, price) => {
    dispatch(cartAction.updateIncrement({ newQuantity: quantity, id, price }));
    dispatch(cartAction.loading(getFromStorage("cart")));
  };
  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("bạn có muốn xóa sản phẩm này không ?")) {
      dispatch(cartAction.deleteCart(id));
      dispatch(cartAction.loading(getFromStorage("cart")));
    }
  };
  return (
    <div className={styles.container}>
      <ul className={styles.cart_title}>
        <li>image</li>
        <li>product</li>
        <li>price</li>
        <li>quantity</li>
        <li>total</li>
        <li>remove</li>
      </ul>

      <ul className={styles.cart_items}>
        {count &&
          count.map((items, i) => (
            <li key={items.id}>
              <img src={items.img} alt={items.product}></img>
              <h2>{items.product}</h2>
              <p>
                {Number(items.total / items.quantity).toLocaleString("vi-VN")}{" "}
                VNĐ
              </p>
              <div className={styles.quantity}>
                <button
                  disabled={items.quantity === 1 ? true : false}
                  className={items.quantity === 1 ? styles.btn_stop : undefined}
                  onClick={() =>
                    updateDecrementHandler(
                      items.id,
                      items.quantity,
                      items.total / items.quantity
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.25em"
                    viewBox="0 0 256 512"
                  >
                    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                  </svg>
                </button>
                <p>{items.quantity}</p>
                <button
                  onClick={() =>
                    updateIncrementHandler(
                      items.id,
                      items.quantity,
                      items.total / items.quantity
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.25em"
                    viewBox="0 0 256 512"
                  >
                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                  </svg>
                </button>
              </div>
              <p>{Number(items.total).toLocaleString("vi-VN")} VNĐ</p>
              <button
                style={{ opacity: 0.5 }}
                onClick={() => deleteHandler(items.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25em"
                  viewBox="0 0 448 512"
                >
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListCart;
