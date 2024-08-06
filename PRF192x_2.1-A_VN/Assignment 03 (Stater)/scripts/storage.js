"use strict";
// Hàm lấy dữ liệu . Lấy dữ liệu từ một mảng được truyền vào nếu có thì lấy lên
// còn không thì trả về 1 mảng rỗng;
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Hàm lưu dữ liệu
function saveTostorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
let users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

console.log(users);
// chuyển mảng users về dạng class Instance
// Trả về 1 mảng chứa 1 Instance của 1 class user đưa qua register.js để xử lý tiếp
const userArr = users.map((user) => parseUser(user));
//
// Lấy dữ liệu user đang đăng nhập
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;
// lấy dữ liệu  todo Arr từ localStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
// Chuyển đổi tiwf Obj về dạng Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
console.log(userArr);
console.log(userActive);
console.log(todoArr);
// Hàm chuyển từ JS Object sang classs Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.catategory
  );
  return user;
}
// Hàm chuyển đổi từ JS Object sang Class Instance của task Class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
