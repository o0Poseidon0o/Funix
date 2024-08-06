import React from "react";
import Banner from "../component/home/Banner";
import Categories from "../component/home/Categories";
import Trending from "../component/home/Trending";
import { useRouteLoaderData } from "react-router-dom";
import Information from "../component/home/Information";
import LiveChat from "../component/update/LiveChat";

const HomePage = () => {
  const data = useRouteLoaderData("data");
  return (
    <>
      <Banner />
      <Categories />
      <Trending
        data={data}
        title={"Top trending products"}
        topic={"Made the hard way"}
      />
      <Information />
      <LiveChat />
    </>
  );
};

export default HomePage;
