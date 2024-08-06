import React from "react";
import styles from "./BoxChat.module.css";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { FaFaceSmile } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";

const BoxChat = ({ toggle }) => {
  return (
    <div className={!toggle ? styles.container : styles.non_container}>
      <div className={styles.title}>
        <p>Customer Support</p>
        <p>Let's Chat App</p>
      </div>
      <div className={styles.content}>
        <div className={styles.user}>
          <p>
            <FaUser style={{ width: "1.5rem", height: "1.5rem" }} />
            <p>Xin chào</p>
          </p>
          <p>
            <FaUser style={{ width: "1.5rem", height: "1.5rem" }} />
            <p>Làm thê nào để xem các sản phẩm</p>
          </p>
        </div>
        <div className={styles.admin}>
          <p>
            <FaUserTie style={{ width: "1.5rem", height: "1.5rem" }} />
            <p>ADMIN: Chào bạn</p>
          </p>
          <p>
            <FaUserTie style={{ width: "1.5rem", height: "1.5rem" }} />
            <p>ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm</p>
          </p>
        </div>
      </div>
      <div className={styles.input}>
        <label htmlFor="box-chat">
          <FaUser style={{ width: "1.5rem", height: "1.5rem" }} />
        </label>
        <input
          type="text"
          id="box-chat"
          name="box-chat"
          placeholder="Enter Message!"
        />

        <GoPaperclip style={{ opacity: "0.3" }} />
        <FaFaceSmile style={{ opacity: "0.3" }} />
        <FaPaperPlane style={{ color: "#74c0fc" }} />
      </div>
    </div>
  );
};
export default BoxChat;
