import React from "react";
import banner from "../../images/banner1.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../redux/store";
import { userArr, saveToStorage, getFromStorage } from "../../redux/storage";
import styles from "./Login.module.css";

const Login = ({ mode }) => {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEmailHandler = (e) => {
    dispatch(loginAction.mail(e.target.value));
  };
  const onPasswordHandler = (e) => {
    dispatch(loginAction.password(e.target.value));
  };

  const userExist = (mail) => {
    return userArr.filter((items) => items.email === mail).length === 0;
  };

  const checkedUser = (mail, ps) => {
    return userArr.filter(
      (items) => items.email === mail && items.password === ps
    );
  };

  const checkedValidate = (ps, mail) => {
    const isValid = false;

    if (ps === null || ps === "") {
      alert("Hãy điền mật khẩu của bạn");
      return isValid;
    }

    if (mail === null || mail === "") {
      alert("Hãy điền mail của bạn");
      return isValid;
    }
    if (userExist(mail)) {
      alert("Email này không tồn tại");
      return isValid;
    }

    return true;
  };

  const onSubmitHandler = () => {
    if (checkedValidate(password, email)) {
      if (checkedUser(email, password).length > 0) {
        dispatch(loginAction.onLogin());
        alert("Đăng nhập thành công");
        const currentUser = checkedUser(email, password);
        currentUser[0].onLogin = true;
        saveToStorage("current", currentUser);
        let currentCart = getFromStorage("current");
        saveToStorage("cart", currentCart[0].cart);
        return navigate("/");
      } else {
        alert("Tài khoản hoặc mật khẩu không đúng");
      }

      // localStorage.removeItem("user");
    }
  };

  return (
    <div className={styles.container}>
      <img src={banner} alt={banner} style={{ width: "100%" }}></img>
      <div className={styles.content}>
        <h1>Sign In</h1>
        <form>
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
        </form>
        <button onClick={onSubmitHandler}>Sign In</button>
        <div className={styles.nav}>
          <p>Create an account?</p>
          <Link to={`/${mode === "signup" ? "login" : "register"}`}>{`${
            mode === "signup" ? "Click" : "Sign Up"
          }`}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
