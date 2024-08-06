"use strict";
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

//  Sự kiện đăng ký
btnSubmit.addEventListener("click", function () {
  // Lấy dư liệu từ người dùng
  // Được lấy từ class User trong file user.js
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );
  // Kiểm tra dữ liệu nhập vào
  const isValidate = validate(user);
  if (isValidate) {
    // Thêm user vào mảng
    userArr.push(user);
    // Lưu dữ liệu xuống localStorage
    saveTostorage("userArr", userArr);
    alert("Đăng kí thành công!!!");
    // Điều hướng sang tragn login
    window.location.assign("../pages/login.html");
  }
});
// Hàm kiểm tra thông tin người dùng
function validate(user) {
  const isValidate = false;
  // không có trường hợp bỏ trống
  if (user.firstname.trim().length === 0) {
    alert("Tên không được để trống!!!");
    return isValidate;
  } else if (user.lastname.trim().length === 0) {
    alert("Phải nhập Tên!!!");
  } else if (user.username.trim().length === 0) {
    alert("Phải nhập User đăng nhập!!!");
  } else if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự!!!");
  } else if (inputPasswordConfirm === "") {
    alert("Vui lòng nhập Confirm Password!!!");
  } else if (user.password != inputPasswordConfirm.value) {
    alert("Password phải giống nhau!!!");
  } else if (
    // Kiểm tra từng phần tử trong mảng username có bị trùng không!!!
    !userArr.every((item) => (item.username !== user.username ? true : false))
  ) {
    alert("Username đã tồn tại đặt User khác !!!");
  } else {
    return true;
  }
}
