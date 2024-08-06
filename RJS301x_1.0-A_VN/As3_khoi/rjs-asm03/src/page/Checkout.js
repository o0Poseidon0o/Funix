import React from "react";
import ShopBanner from "../component/shop/ShopBanner";
import ShopSearch from "../component/shop/ShopSearch";
import MainCheckout from "../component/checkout/MainCheckout";
import LiveChat from "../component/update/LiveChat";

const CheckoutPage = () => {
  return (
    <>
      <ShopBanner title="checkout" mode="checkout"></ShopBanner>
      <ShopSearch title="billing details"></ShopSearch>
      <MainCheckout />
      <LiveChat />
    </>
  );
};

export default CheckoutPage;
