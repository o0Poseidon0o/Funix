import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
// Cách đưa CSS vào class (1)
import classes from "../Users/AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  // Tạo một biến enterUsername nhập user, setEnteredUsername lưu giá trị nhập
  // của User để tái sử dụng.
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  // Tạo hàm nhập tên User từ người dùng
  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Giá trị nhập",
        message: "Hãy tên và tuổi không được để trống",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Giá trị tuổi",
        message: "Hãy nhập giá trị tuổi >0",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };
  // Lấy giá trị ten người dùng nhập
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  // lấy giá trị tuổi người dùng nhập
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  // hàm báo lỗi
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {/* Nếu biến "error" không chứa đối tượng lỗi (falsy value), 
      điều kiện "error &&" sẽ trả về false và component <ErrorModal> 
      sẽ không được render. */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      {/* (1) */}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
