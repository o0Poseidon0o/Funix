import React from "react";
import { useParams } from "react-router-dom";
import Trending from "../home/Trending";
import styles from "./RelatedProduct.module.css";
const RelatedProduct = ({ data }) => {
  const param = useParams();
  const product = data.filter((items) => items._id.$oid === param.productId);
  const related = data.filter(
    (items) => items.category === product[0].category
  );
  const listDesc = product[0].long_desc
    .split("\n")
    .filter((items) => items !== "");

  console.log(product[0].long_desc.split("\n").filter((items) => items !== ""));
  return (
    <div className={styles.container}>
      <h2>description</h2>
      <h1>product description</h1>
      <ul className={styles.content}>
        <li>{listDesc[0]}</li>
        {listDesc.slice(1).map((items) => (
          <li key={items}>{items}</li>
        ))}
      </ul>
      <h1>related products</h1>
      <div className={styles.image}>
        <Trending data={related} mode={"details"} />
      </div>
    </div>
  );
};

export default RelatedProduct;
