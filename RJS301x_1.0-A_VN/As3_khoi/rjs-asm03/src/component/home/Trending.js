import React from "react";
import styles from "./Trending.module.css";
import { popupAction } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopNavigate from "../shop/ShopNavigate";

const Trending = ({ data, topic, title, mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = (id) => {
    if (!topic && !title) {
      navigate(`/details/${id}`);

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      const items = data.filter((items) => items._id.$oid === id);

      dispatch(popupAction.showPopup(items));
    }
  };
  return (
    <div className={!topic && !title ? styles.container : undefined}>
      {topic && title && (
        <div className={styles.title}>
          <p>{topic}</p>
          <h2>{title}</h2>
        </div>
      )}
      <ul
        className={
          !topic && !title ? styles.products_list_shop : styles.products_list
        }
      >
        {data &&
          data.slice(0, 9).map((items) => {
            return (
              <li
                className={
                  !topic && !title ? styles.products_shop : styles.products
                }
                key={items._id.$oid}
              >
                <img
                  src={items.img1}
                  alt={items._id}
                  onClick={() => {
                    onClickHandler(items._id.$oid);
                  }}
                ></img>
                <div className={styles.descriptions}>
                  <p>{items.name}</p>
                  <p>{Number(items.price).toLocaleString("vi-VN")} VNĐ</p>
                </div>
              </li>
            );
          })}
        {data && data.length === 0 && (
          <li className={styles.non_results}>
            <p>No Results</p>
          </li>
        )}
      </ul>
      {!topic && !title && !mode && <ShopNavigate data={data} />}
    </div>
  );
};
export default Trending;
