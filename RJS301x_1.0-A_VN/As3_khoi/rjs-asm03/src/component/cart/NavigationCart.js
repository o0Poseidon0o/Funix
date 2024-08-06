import React from "react";
import styles from "./NavigationCart.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cartAction } from "../../redux/store";
import { getFromStorage } from "../../redux/storage";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const NavigationCart = () => {
  const count = useSelector((state) => state.cart.count);

  const dispatch = useDispatch();

  useEffect(() => {
    const loading = () => {
      dispatch(cartAction.loading(getFromStorage("cart")));
    };
    loading();
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <p
        onClick={() => {
          navigate("/shop/categories");
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        <FaLongArrowAltLeft />
        Continue shopping
      </p>
      {count && count.length > 0 && (
        <p
          onClick={() => {
            navigate("/checkout");
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Proceed to checkout
          <FaLongArrowAltRight />
        </p>
      )}
    </div>
  );
};
export default NavigationCart;
