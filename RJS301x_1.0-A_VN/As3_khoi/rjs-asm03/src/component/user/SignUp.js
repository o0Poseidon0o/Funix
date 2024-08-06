import React from "react";
import banner from "../../images/banner1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../redux/store";
import { userArr, saveToStorage } from "../../redux/storage";
import styles from "./SignUp.module.css";
const SignUp = ({ mode }) => {
  const email = useSelector((state) => state.signUp.email);
  const password = useSelector((state) => state.signUp.password);
  const account = useSelector((state) => state.signUp.name);
  const phone = useSelector((state) => state.signUp.phone);
  const cart = useSelector((state) => state.signUp.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEmailHandler = (e) => {
    dispatch(signUpAction.mail(e.target.value));
  };
  const onPasswordHandler = (e) => {
    dispatch(signUpAction.password(e.target.value));
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
    return userArr.filter((items) => items.email === mail).length > 0;
  };

  const checkedValidate = (acc, ps, mail, num) => {
    const isValid = false;
    if (acc === null || acc === "") {
      alert("Hãy điền tên của bạn");
      return isValid;
    }
    if (ps === null || ps === "") {
      alert("Hãy điền mật khẩu của bạn");
      return isValid;
    }
    if (ps.split("").length <= 8) {
      console.log(ps.split("").length);
      alert("Mật khẩu phải nhiều hơn 8 ký tự");
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
    if (checkedSpace(ps)) {
      alert("Mật khẩu không được để khoảng trắng");
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
      alert("Email này đã có người sử dụng");
      return isValid;
    }

    return true;
  };

  const onSubmitHandler = () => {
    if (checkedValidate(account, password, email, phone)) {
      const user = { account, password, email, phone, cart };
      userArr.push(user);
      saveToStorage("user", userArr);
      console.log(user);
      return navigate("/login");
      // localStorage.removeItem("user");
    }
  };

  return (
    <div className={styles.container}>
      <img src={banner} alt={banner} style={{ width: "100%" }}></img>
      <div className={styles.content}>
        <h1>Sign Up</h1>

        <form>
          <input
            type="text"
            id="account"
            name="account"
            placeholder="Full Name"
            onChange={onAccountHandler}
          ></input>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={onEmailHandler}
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onPasswordHandler}
          ></input>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            onChange={onPhoneHandler}
          ></input>
        </form>

        <button onClick={onSubmitHandler}>Sign Up</button>
        <div className={styles.nav}>
          <p>Login?</p>
          <Link to={`/${mode === "signup" ? "login" : "register"}`}>{`${
            mode === "signup" ? "Click" : "Sign Up"
          }`}</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
