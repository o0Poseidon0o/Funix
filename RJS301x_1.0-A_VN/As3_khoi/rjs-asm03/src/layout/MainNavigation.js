import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFromStorage } from "../redux/storage";
import { loginAction } from "../redux/store";
import { FaCartFlatbed } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";

import { cartAction } from "../../src/redux/store";
import ShowProduct from "../component/update/ShowProduct";

const MainNavigation = () => {
  const count = useSelector((state) => state.cart.count);
  const data = getFromStorage("current");
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState(false);
  const onLogin = useSelector((state) => state.login.onLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    if (window.confirm("Bạn có chắc không?")) {
      localStorage.removeItem("current");
      localStorage.removeItem("cart");
      dispatch(loginAction.onLogout());
    }
  };
  const onClickHandler = () => {
    return navigate("/");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(toggle);
    }, 300);

    return () => clearTimeout(timeout);
  }, [toggle]);
  useEffect(() => {
    if (data.length > 0) {
      dispatch(cartAction.loading(getFromStorage("cart")));
      dispatch(loginAction.onLogin());
    }
  }, [data.length, dispatch]);

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop/categories"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Shop
              </NavLink>
            </li>
          </ul>
          <h1 onClick={onClickHandler}>BOUTIQUE</h1>
          <ul className={styles.nav_list}>
            <li className={styles.cart_numb}>
              <NavLink
                to={"/carts"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
                end
              >
                <FaCartFlatbed
                  style={{ fontSize: "1.25rem", opacity: "0.3" }}
                />
                Cart
                {data && data.length > 0 && count && count.length > 0 && (
                  <>
                    <p
                      className={styles.numb}
                      onMouseEnter={() => setToggle(true)}
                      onMouseOut={() => setToggle(false)}
                    >
                      {count.length}
                    </p>
                  </>
                )}
              </NavLink>
              {state ? <ShowProduct toggle={toggle} /> : ""}
            </li>
            {!onLogin && (
              <li>
                <NavLink
                  to={"login"}
                  className={({ isActive }) => {
                    return isActive ? styles.active : undefined;
                  }}
                >
                  <BsFillPersonFill
                    style={{ fontSize: "1.25rem", opacity: "0.3" }}
                  />
                  Login
                </NavLink>
              </li>
            )}

            {data && data.length > 0 && data[0].onLogin && (
              <li>
                <NavLink to={"/"}>
                  <BsFillPersonFill
                    style={{ fontSize: "1.25rem", opacity: "0.3" }}
                  />
                  {data[0].account}
                  <BiSolidDownArrow
                    style={{ fontSize: "0.6rem", paddingTop: "0.3rem" }}
                  />
                </NavLink>
              </li>
            )}
            {data && data.length > 0 && data[0].onLogin && (
              <li className={styles.logout}>
                <NavLink to={"/"} onClick={onLogoutHandler}>
                  ( Logout )
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
