import React from "react";
import Login from "../component/user/Login";
import LiveChat from "../component/update/LiveChat";

const LoginPage = () => {
  return (
    <>
      <Login mode="login" />
      <LiveChat />
    </>
  );
};

export default LoginPage;
