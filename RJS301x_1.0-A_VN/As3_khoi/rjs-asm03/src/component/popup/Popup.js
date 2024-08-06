import React from "react";
import style from "./Popup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { popupAction } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { FaCartFlatbed } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const Popup = ({ items }) => {
  const open = useSelector((state) => state.popup.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseHandler = () => {
    dispatch(popupAction.closePopup());
  };
  const onDetailsHandler = (id) => {
    dispatch(popupAction.closePopup());
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return navigate(`/details/${id}`);
  };

  console.log(items);
  return (
    <>
      {items.map((items) => (
        <div
          className={open ? style.container : style.re_container}
          key={items.name}
        >
          <div className={style.image}>
            <img src={items.img1} alt={items.name}></img>
          </div>
          <div className={style.content}>
            <h2>{items.name}</h2>
            <h3>{Number(items.price).toLocaleString("vi-VN")} VNĐ</h3>
            <p>{items.short_desc}</p>
            <button
              className={style.btn}
              onClick={() => onDetailsHandler(items._id.$oid)}
            >
              <FaCartFlatbed
                style={{
                  fontSize: "1.25rem",
                }}
              />
              View Detail
            </button>
          </div>
          <button className={style.close_btn} onClick={onCloseHandler}>
            <ImCross></ImCross>
          </button>
        </div>
      ))}
    </>
  );
};

export default Popup;
