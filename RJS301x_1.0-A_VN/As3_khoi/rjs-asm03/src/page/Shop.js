import React from "react";
import ShopProduct from "../component/shop/ShopProduct";
import ShopBanner from "../component/shop/ShopBanner";
import ShopSearch from "../component/shop/ShopSearch";
import { useRouteLoaderData } from "react-router-dom";
import LiveChat from "../component/update/LiveChat";

const ShopPage = () => {
  const data = useRouteLoaderData("data");
  return (
    <>
      <ShopBanner title="shop" mode="shop" />
      <ShopSearch title="categories" />
      <ShopProduct data={data} />
      <LiveChat />
    </>
  );
};

export default ShopPage;
