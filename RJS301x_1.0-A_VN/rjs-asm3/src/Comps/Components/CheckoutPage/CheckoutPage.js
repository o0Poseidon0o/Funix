import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store";
import { convertNumberToString } from "../../Hooks/utils";
import Container from "../../UI/Container";
import DarkButton from "../../UI/DarkButton";
import classes from "./CheckoutPage.module.css";

function CheckoutPage() {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //Tải giỏ hàng của người dùng
  useEffect(() => {
    dispatch(cartActions.loadCart(user.name));
    if (!user.name) {
      alert("Cần đăng nhập để đặt hàng!");
      window.location.replace("/");
    }
  }, [dispatch, user]);

  // lấy dữ liệu từ redux
  const data = useSelector((state) => state.cart.data);

  //Khai báo biến tổng và tính tổng
  let totalPrice = 0;
  for (let i = 0; i < data.length; i++) {
    totalPrice += data[i].price * data[i].quantity;
  }

  return (
    <Container className={`${classes["checkout"]} mb-5`}>
      <div
        className={`${classes.header} d-flex justify-content-between align-items-center bg-light p-5 mb-5`}
      >
        <h3>CHECK OUT</h3>

        <p>
          <strong className="fw-semibold">HOME / CART /</strong> CHECK OUT
        </p>
      </div>
      <h5>BUILLING DETAIL</h5>

      <div className={`${classes.detail} row`}>
        <form
          className={`${classes.form} d-flex flex-column align-items-start pe-3 col col-md-8`}
        >
          <label>FULL NAME:</label>
          <input placeholder="Enter Your Full Name Here!"></input>

          <label>EMAIL:</label>
          <input placeholder="Enter Your Email Here!"></input>

          <label>PHONE NUMBER:</label>
          <input placeholder="Enter Your Phone Number Here!"></input>

          <label>ADDRESS:</label>
          <input placeholder="Enter Your Address Here!"></input>

          <DarkButton to="#" onClick={() => {}} className="d-inline mt-3">
            Place order
          </DarkButton>
        </form>

        <div className={`${classes.order} bg-light py-4 px-3 col`}>
          <h5>YOUR ORDER</h5>

          <ul className="list-group list-group-flush bg-light">
            {data.map((item) => (
              <li className="list-group-item bg-light" key={item._id.$oid}>
                <p>{item.name}</p>
                <p>
                  {convertNumberToString(item.price)} VND x {item.quantity}
                </p>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between bg-light">
              <p>TOTAL</p>
              <p className="text-dark fs-5">
                {convertNumberToString(totalPrice)} VND
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default CheckoutPage;
