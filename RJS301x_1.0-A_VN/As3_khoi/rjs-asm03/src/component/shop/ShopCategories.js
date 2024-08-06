import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ShopCategories.module.css";
const ShopCategories = () => {
  return (
    <>
      {/* <Link to={"/shop/all"}>ALL</Link> */}
      <section style={{ width: "30%" }}>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li>
              <h1>apple</h1>
            </li>
            <li>
              <NavLink
                to={"/shop/all"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
                end
              >
                All
              </NavLink>
            </li>
            <li>
              <h1>iphone & mac</h1>
            </li>
            <li>
              <NavLink
                to={"/shop/iphone"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Iphone
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop/ipad"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Ipad
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop/macbook"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Macbook
              </NavLink>
            </li>
            <li>
              <h1>wireless</h1>
            </li>
            <li>
              <NavLink
                to={"/shop/airpod"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Airpod
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop/watch"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Watch
              </NavLink>
            </li>
            <li>
              <h1>other</h1>
            </li>
            <li>
              <NavLink
                to={"/shop/mouse"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Mouse
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop/keyboard"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Keyboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop/other"}
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Other
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};
export default ShopCategories;
