import classes from "./AuthLogin.module.css";

import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/index";

function Login() {
  // Declare emailRef, passRef, and dispatch
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();

  const userArr = localStorage.getItem("USER_LIST")
    ? JSON.parse(localStorage.getItem("USER_LIST"))
    : [];

  //Hàm xử lý quá trình đăng nhập khi biểu mẫu được gửi
  function signInHandle(e) {
    e.preventDefault();

    const index = userArr.findIndex(
      (user) => user.email === emailRef.current.value
    );

    if (index > -1 && userArr[index].pass === passRef.current.value) {
      dispatch(authActions.login(userArr[index]));

      window.location.replace("/");
    } else {
      // Nếu thông tin đăng nhập không chính xác, hiển thị cảnh báo và xóa trường mật khẩu
      alert("Thông tin đăng nhập không chính xác!");
      passRef.current.value = "";
      passRef.current.focus();
      return;
    }
  }
  return (
    <div className={`${classes.login} position-relative`}>
      <div className="position-absolute top-50 start-50 translate-middle bg-white text-center p-5 rounded-3 shadow">
        <h3 className="fw-normal text-secondary fst-italic">Sign In</h3>
        <form
          className={`${classes.form} d-flex flex-column`}
          onSubmit={signInHandle}
        >
          <input
            type="email"
            placeholder="Email"
            required
            ref={emailRef}
          ></input>
          <input
            type="password"
            placeholder="Password"
            required
            ref={passRef}
          ></input>
          <button className="border-0 text-light mt-4 mb-5 p-3" type="submit">
            SIGN IN
          </button>
        </form>
        <p className="text-secondary fst-italic">
          Create an account? <NavLink to="/register">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
