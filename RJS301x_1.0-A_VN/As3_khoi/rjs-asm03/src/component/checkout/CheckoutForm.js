import React from "react";
import styles from "./CheckoutForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../redux/store";
import { saveToStorage, getFromStorage } from "../../redux/storage";

const CheckoutForm = () => {
  const email = useSelector((state) => state.signUp.email);
  const address = useSelector((state) => state.signUp.address);
  const account = useSelector((state) => state.signUp.name);
  const phone = useSelector((state) => state.signUp.phone);
  let checkoutArr = getFromStorage("checkout");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEmailHandler = (e) => {
    dispatch(signUpAction.mail(e.target.value));
  };
  const onAddressHandler = (e) => {
    dispatch(signUpAction.address(e.target.value));
  };
  const onAccountHandler = (e) => {
    dispatch(signUpAction.name(e.target.value));
  };
  const onPhoneHandler = (e) => {
    dispatch(signUpAction.phone(e.target.value));
  };

  const checkedSpace = (items) => {
    return items.split("").filter((items) => items === " ").length > 0;
  };
  const userExist = (mail) => {
    return checkoutArr.filter((items) => items.email === mail).length > 0;
  };

  const checkedValidate = (acc, addr, mail, num) => {
    const isValid = false;
    if (acc === null || acc === "") {
      alert("Hãy điền tên của bạn");
      return isValid;
    }
    if (addr === null || addr === "") {
      alert("Hãy điền địa chỉ hiện tại của bạn");
      return isValid;
    }
    if (mail === null || mail === "") {
      alert("Hãy điền mail của bạn");
      return isValid;
    }
    if (num === null || num === "") {
      alert("Hãy điền số điện thoại của bạn");
      return isValid;
    }

    if (!(mail.split("").filter((items) => items === "@").length > 0)) {
      alert("Email bắt buộc phải có ký tự @");
      return isValid;
    }
    if (checkedSpace(mail)) {
      alert("Email không được để khoảng trắng");
      return isValid;
    }
    if (checkedSpace(num)) {
      alert("Số điện thoại không được để khoảng trắng");
      return isValid;
    }

    if (userExist(mail)) {
      alert("Email này đã đặt hàng rồi");
      return isValid;
    }

    return true;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (checkedValidate(account, address, email, phone)) {
      console.log(address, account, email, phone);
      const checkout = { account, address, email, phone };
      checkoutArr.push(checkout);
      saveToStorage("checkout", checkoutArr);
      console.log(checkout);
      return navigate("/");
      // localStorage.removeItem("user");
    }
  };

  return (
    <form className={styles.container}>
      <label htmlFor="account">Full Name</label>
      <input
        type="text"
        id="account"
        name="account"
        placeholder="Enter Your Full Name Here"
        onChange={onAccountHandler}
      ></input>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Enter Your Email Here"
        onChange={onEmailHandler}
      ></input>
      <label htmlFor="phone">Phone Number</label>
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Enter Your Phone Number Here"
        onChange={onPhoneHandler}
      ></input>
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Enter Your Address Here"
        onChange={onAddressHandler}
      ></input>
      <button onClick={onSubmitHandler}>Place order</button>
    </form>
  );
};

export default CheckoutForm;
