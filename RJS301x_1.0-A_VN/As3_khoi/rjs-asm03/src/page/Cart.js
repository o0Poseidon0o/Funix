import React from "react";
import ShopBanner from "../component/shop/ShopBanner";
import ShopSearch from "../component/shop/ShopSearch";
import LiveChat from "../component/update/LiveChat";

import MainCart from "../component/cart/MainCart";
import NavigationCart from "../component/cart/NavigationCart";

const CartsPage = () => {
  return (
    <>
      <ShopBanner title="cart" mode="cart"></ShopBanner>
      <ShopSearch title="shopping cart"></ShopSearch>
      <MainCart />
      <NavigationCart />
      <LiveChat />
    </>
  );
};

export default CartsPage;
