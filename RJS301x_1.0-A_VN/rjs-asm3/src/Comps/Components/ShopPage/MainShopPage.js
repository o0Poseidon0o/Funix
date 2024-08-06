import { useState, useEffect } from "react";
import useHttp from "../../Hooks/use-http";
import Container from "../../UI/Container";
import classes from "./MainShopPage.module.css";
import ProductList from "./ProductList";

function MainShopPage() {
  const [category, setCategory] = useState("all");

  const [data, setData] = useState([]);
  const { error, loading, requestAPI: product } = useHttp();

  useEffect(() => {
    const getProduct = (data) => {
      setData(data);
    };
    product(getProduct);
  }, [product]);

  function clickCategoryHandler(e) {
    setCategory(e.target.outerText.toLowerCase());
  }

  return (
    <Container>
      <div
        className={`${classes.header} d-flex justify-content-between align-items-center bg-light p-5`}
      >
        <h3>Shop</h3>
        <p>shop</p>
      </div>
      <div className={`${classes.subnav} row m-0 mt-5`}>
        <ul className="col-md-3">
          <h4>categories</h4>
          <li className={`${classes.titleCategory} bg-dark text-light`}>
            Apple
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "all" ? classes.active : ""}`}
          >
            All
          </li>
          <li className={`${classes.titleCategory} bg-secondary bg-opacity-25`}>
            Iphone & Mac
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "iphone" ? classes.active : ""}`}
          >
            IPhone
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "ipad" ? classes.active : ""}`}
          >
            Ipad
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "macbook" ? classes.active : ""}`}
          >
            Macbook
          </li>
          <li className={`${classes.titleCategory} bg-secondary bg-opacity-25`}>
            Wireless
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "airpod" ? classes.active : ""}`}
          >
            Airpod
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "watch" ? classes.active : ""}`}
          >
            Watch
          </li>
          <li className={`${classes.titleCategory} bg-secondary bg-opacity-25`}>
            Other
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "mouse" ? classes.active : ""}`}
          >
            Mouse
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "keyboard" ? classes.active : ""}`}
          >
            Keyboard
          </li>
          <li
            onClick={clickCategoryHandler}
            className={`${category === "other" ? classes.active : ""}`}
          >
            Other
          </li>
        </ul>

        <ProductList
          items={data}
          error={error}
          loading={loading}
          className="col-md-9"
          category={category}
        ></ProductList>
      </div>
    </Container>
  );
}

export default MainShopPage;
