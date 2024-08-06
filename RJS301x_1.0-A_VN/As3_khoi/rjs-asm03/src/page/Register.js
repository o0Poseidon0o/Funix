import React from "react";
import SignUp from "../component/user/SignUp";
import LiveChat from "../component/update/LiveChat";

const RegisterPage = () => {
  return (
    <>
      <SignUp mode="signup" />
      <LiveChat />
    </>
  );
};

export default RegisterPage;
