import React from "react";
import styles from "./ShopNavigate.module.css";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ShopNavigate = ({ data }) => {
  return (
    <div
      className={
        data && data.length === 0 ? styles.close_nav : styles.container
      }
    >
      <div className={styles.nav}>
        <button>
          <MdKeyboardDoubleArrowLeft />
        </button>
        <p>1</p>
        <button>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
      <p className={styles.desc}>Showing 1-9 of 9 results</p>
    </div>
  );
};

export default ShopNavigate;
