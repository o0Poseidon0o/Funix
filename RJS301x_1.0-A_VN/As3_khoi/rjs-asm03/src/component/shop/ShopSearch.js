import React from "react";
import styles from "./ShopSearch.module.css";
const ShopSearch = ({ title }) => {
  return (
    <div className={styles.container}>
      {title === "categories" && (
        <>
          <h1>{title}</h1>
          <form>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Enter Search Here"
            ></input>
          </form>
          <select className={styles.sorting}>
            <option>Default sorting</option>
          </select>
        </>
      )}
      {title === "shopping cart" && (
        <>
          <h1>{title}</h1>
        </>
      )}
      {title === "billing details" && (
        <>
          <h1>{title}</h1>
        </>
      )}
    </div>
  );
};

export default ShopSearch;
