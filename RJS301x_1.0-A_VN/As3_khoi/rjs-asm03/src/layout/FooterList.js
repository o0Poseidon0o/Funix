import React from "react";
import { Link } from "react-router-dom";
import styles from "./FooterList.module.css";
const FooterList = ({ title, firstOpt, secondOpt, thirdOpt, fourthOpt }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <ul className={styles.content}>
        <li>
          <Link to={"/"}>{firstOpt}</Link>
        </li>
        <li>
          <Link to={"/"}>{secondOpt}</Link>
        </li>
        <li>
          <Link to={"/"}>{thirdOpt}</Link>
        </li>
        <li>
          <Link to={"/"}>{fourthOpt}</Link>
        </li>
      </ul>
    </div>
  );
};
export default FooterList;
