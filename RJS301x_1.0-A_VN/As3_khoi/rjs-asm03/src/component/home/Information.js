import React from "react";
import style from "./Information.module.css";
const Information = () => {
  return (
    <div className={style.container}>
      <div className={style.service}>
        <div className={style.content}>
          <h2>Free shipping</h2>
          <p>Free shipping worldwide</p>
        </div>
        <div className={style.content}>
          <h2>24 x 7 service</h2>
          <p>Free shipping worldwide</p>
        </div>
        <div className={style.content}>
          <h2>Festival offer</h2>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={style.mail}>
        <div className={style.title}>
          <h2>Let's be friends!</h2>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <form>
          <input type="email" placeholder="Enter your email address"></input>
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Information;
