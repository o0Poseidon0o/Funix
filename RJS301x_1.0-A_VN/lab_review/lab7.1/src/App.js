import React, { useState } from "react";
import AddUser from "./Component/Users/AddUser";
import UsersList from "./Component/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);
  // sử dụng toán tử spread (...) để tạo ra một bản sao của mảng
  // prevUsersList (để không thay đổi trực tiếp giá trị của state hiện tại).
  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler}></AddUser>
      <UsersList users={usersList}></UsersList>
    </div>
  );
}

export default App;
