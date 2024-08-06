import React, { useEffect } from "react";
import { BsMessenger } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { liveChatAction } from "../../redux/store";
import styles from "./LiveChat.module.css";
import BoxChat from "./BoxChat";
const LiveChat = () => {
  const toggle = useSelector((state) => state.chat.toggle);
  const animation = useSelector((state) => state.chat.animation);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(liveChatAction.animation(toggle));
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch, toggle]);
  return (
    <div className={styles.container}>
      <div
        className={styles.icon}
        onClick={() => {
          dispatch(liveChatAction.loading(!toggle));
        }}
        style={{
          backgroundColor: "black",
          width: "32px",
          height: "32px",
          padding: "0.4rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BsMessenger style={{ fontSize: "2rem", color: "#fff" }} />
      </div>
      <div>{animation ? <BoxChat toggle={toggle} /> : ""}</div>
    </div>
  );
};

export default LiveChat;
