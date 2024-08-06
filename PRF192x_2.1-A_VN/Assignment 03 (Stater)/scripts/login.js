"use strict";
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// Kiểm tra dữ liệu nhập vào
function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Nhập Username đã đăng kí!!!");
  } else if (inputPassword.value === "") {
    alert("Nhập lại password");
  } else {
    return isValidate;
  }
}
// Sự  kiện login
btnSubmit.addEventListener("click", function () {
  // Kiểm tra thông tin người dùng đã nhập hay chưa
  const isValidate = validate();
  if (isValidate) {
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );

    if (user) {
      alert("Đăng nhập thành công!!!");
      // Lưu thoongtin user hiện tại đang đăng nhập trên trang
      saveTostorage("userActive", user);
      // chuyển hướng về trang chủ
      window.location.assign("../index.html");
    } else {
      alert("Thông tin không đúng vui lòng keierm tra lại !!!");
    }
  }
});
