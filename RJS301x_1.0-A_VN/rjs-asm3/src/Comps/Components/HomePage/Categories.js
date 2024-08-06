import { NavLink } from "react-router-dom";
import Container from "../../UI/Container";
import classes from "./Categories.module.css";

function Categories() {
  const category = [];

  for (let i = 1; i <= 5; i++) {
    category.push(`./Resource/product_${i}.png`);
  }

  return (
    <Container className={`${classes.categories} text-center`}>
      <div>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h4>Browse our categories</h4>
      </div>
      <div className="d-flex flex-wrap justify-content-lg-between justify-content-center gap-4">
        {category.map((e) => (
          <NavLink to="/shop" key={e}>
            <img src={e} alt="..." className="img-fluid" />
          </NavLink>
        ))}
      </div>
    </Container>
  );
}
export default Categories;
