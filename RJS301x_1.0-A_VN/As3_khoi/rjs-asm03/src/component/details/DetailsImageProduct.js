import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailsImageProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, changeImageAction } from "../../redux/store";

const DetailsImageProduct = ({ data }) => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.image.data);
  const id = useSelector((state) => state.image.id);

  const param = useParams();
  const products = data.filter((items) => items._id.$oid === param.productId);
  let imageProducts = [
    products[0].img1,
    products[0].img2,
    products[0].img3,
    products[0].img4,
  ];

  const onClickHandler = (url) => {
    dispatch(changeImageAction.changeImage(url));
  };
  useEffect(() => {
    dispatch(changeImageAction.defaultImage(param.productId));
    dispatch(cartAction.defaultQuantity());
  }, [id, param.productId, dispatch]);

  return (
    <div className={styles.container}>
      <ul className={styles.nav_list}>
        {imageProducts.map((items, index) => (
          <li key={index}>
            <img
              src={items}
              alt={products[0].name}
              onClick={() => onClickHandler(items)}
            ></img>
          </li>
        ))}
      </ul>
      <div className={styles.image}>
        <img
          src={!imageUrl ? products[0].img1 : imageUrl}
          className={styles.main_img}
          alt={products[0].name}
        ></img>
      </div>
    </div>
  );
};

export default DetailsImageProduct;
