"use strict";
// tạo class User đại diện cho người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    // Mặc định không khai báo thifgias trị của 2 thuộc tính này sẽ cho sẵn như sau
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    // Cá nhân hóa luôn phần 9==> cá nhân hóa luôn phần cài đặt trang tin cho tiêng từng User.
    this.pageSize = pageSize;
    this.category = category;
  }
}
// ClassTask để chứa các thoogn tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
