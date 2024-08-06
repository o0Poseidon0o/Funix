import React from "react";
import LiveChat from "../component/update/LiveChat";

import { useRouteLoaderData } from "react-router-dom";
import MainDetails from "../component/details/MainDetails";
import RelatedProduct from "../component/details/RelatedProduct";
const DetailsPage = () => {
  const data = useRouteLoaderData("data");
  return (
    <>
      <MainDetails data={data}></MainDetails>
      <RelatedProduct data={data} />
      <LiveChat />
    </>
  );
};

export default DetailsPage;
