import React from "react";
import DetailsImageProduct from "../details/DetailsImageProduct";
import DetailsProduct from "../details/DetailsProduct";
import styles from "./MainDetails.module.css";
const MainDetails = ({ data }) => {
  return (
    <div className={styles.container}>
      <DetailsImageProduct data={data} />
      <DetailsProduct data={data} />
    </div>
  );
};

export default MainDetails;
