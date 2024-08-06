import React from "react";
import { Outlet, json } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Card from "./Card";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Popup from "../component/popup/Popup";
import style from "./RootLayout.module.css";

const RootLayout = () => {
  const items = useSelector((state) => state.popup.items);
  const open = useSelector((state) => state.popup.toggle);

  return (
    <>
      {open && (
        <>
          <Popup items={items} />
          <div className={style.overplay}></div>
        </>
      )}
      <Card>
        <MainNavigation />
        <Outlet />
      </Card>
      <Footer />
    </>
  );
};

export default RootLayout;

export const loader = async () => {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  if (!response.ok) {
    throw json({ message: "Could not loading data" }, { status: 500 });
  } else {
    return response;
  }
};
