import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { categoriesShopAction } from "../../redux/store";
import Trending from "../home/Trending";

const ShopProductList = ({ data }) => {
  const reduxData = useSelector((state) => state.categories.data);

  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    const isChecked = (mode) => {
      const loadingData = (mode) => {
        if (data.filter((items) => items.category === mode).length > 0) {
          return data.filter((items) => items.category === mode);
        } else {
          return [];
        }
      };
      const defaultData = (mode) => {
        if (mode === "all" || mode === "categories") {
          return data;
        }
      };
      switch (mode) {
        case "iphone":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "ipad":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "all":
          dispatch(categoriesShopAction.allProduct(defaultData(mode)));
          break;
        case "categories":
          dispatch(categoriesShopAction.allProduct(defaultData(mode)));
          break;
        case "macbook":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "airpod":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "watch":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "mouse":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "keyboard":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;
        case "other":
          dispatch(categoriesShopAction.allProduct(loadingData(mode)));
          break;

        default:
          dispatch(categoriesShopAction.allProduct([]));
          break;
      }
    };
    isChecked(param.categories);
    return () => {
      isChecked(param.categories);
    };
  }, [param.categories, data, dispatch]);

  console.log(reduxData);

  return (
    <>
      <Trending data={reduxData} />
    </>
  );
};
export default ShopProductList;
