import React from "react";
import styles from "./ShopBanner.module.css";
import { NavLink } from "react-router-dom";

const ShopBanner = ({ title, mode }) => {
  return (
    <div className={styles.content}>
      <h1>{title}</h1>
      {mode === "shop" && (
        <ul className={styles.shop}>
          <li>
            <NavLink
              to={`/${mode}/categories`}
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              {mode}
            </NavLink>
          </li>
        </ul>
      )}
      {mode === "cart" && (
        <ul className={styles.shop}>
          <li>
            <NavLink
              to={`/${mode}s`}
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              {mode}
            </NavLink>
          </li>
        </ul>
      )}
      {mode === "checkout" && (
        <ul className={styles.checkout}>
          <li>
            <NavLink
              to={`/`}
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              home
            </NavLink>
          </li>
          <li>/</li>
          <li>
            <NavLink
              to={`/carts`}
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              cart
            </NavLink>
          </li>
          <li>/</li>
          <li>
            <NavLink
              to={`/${mode}`}
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              {mode}
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ShopBanner;
