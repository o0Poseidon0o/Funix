import { useState } from "react";
import classes from "./ChatPopup.module.css";

function ChatPopup() {
  // Khai báo state cho popup
  const [popupOpen, setPopupOpen] = useState(false);

  // Hàm xử lý khi người dùng click vào nút popup
  const handleOpenPopup = () => {
    setPopupOpen(popupOpen ? false : true);
  };

  return (
    <div>
      <button onClick={handleOpenPopup} className={classes["chat-button"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          ></path>
          <polyline
            points="80 144 112 112 144 144 176 112"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          ></polyline>
        </svg>
      </button>
      {popupOpen ? (
        <div
          className={`bg-white rounded-4 shadow-lg ${classes["chat-popup"]} d-flex flex-column overflow-hidden`}
        >
          <div className="d-flex justify-content-between align-center border-bottom px-3 pt-3">
            <p className="text-dark fw-bold fs-6">Customer Support</p>
            <button className="border-0"> Let's Chat App</button>
          </div>
          <div className="p-3 text-dark flex-fill">Message</div>
          <div className="bg-light px-3 border-top d-flex justify-content-between align-items-center py-1">
            <img src="./Resource/admin-icon.png" alt=""></img>
            <input type="text" placeholder="Enter Message!"></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#828282"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M96,176l95.8-92.2a28,28,0,0,0-39.6-39.6L54.1,142.1a47.9,47.9,0,0,0,67.8,67.8L204,128"
                fill="none"
                stroke="#828282"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#828282"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke="#828282"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></circle>
              <circle cx="92" cy="108" r="16"></circle>
              <circle cx="164" cy="108" r="16"></circle>
              <path
                d="M169.6,152a48.1,48.1,0,0,1-83.2,0"
                fill="none"
                stroke="#828282"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#12c2fd"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M210.3,35.9,23.9,88.4a8,8,0,0,0-1.2,15l85.6,40.5a7.8,7.8,0,0,1,3.8,3.8l40.5,85.6a8,8,0,0,0,15-1.2L220.1,45.7A7.9,7.9,0,0,0,210.3,35.9Z"
                fill="none"
                stroke="#12c2fd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
              <line
                x1="110.9"
                y1="145.1"
                x2="156.1"
                y2="99.9"
                fill="none"
                stroke="#12c2fd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatPopup;
