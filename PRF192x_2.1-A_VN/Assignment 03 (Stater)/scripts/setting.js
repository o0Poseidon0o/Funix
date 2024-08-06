"use strict";
if (userActive) {
  const inputPagesSize = document.getElementById("input-page-size");
  const inputCatefory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // cập nhật lại userActive
      userActive.pageSize = Number.parseInt(inputPagesSize.value);
      userActive.category = inputCatefory.value;
      saveTostorage("userActive", userActive);
      // cập nhật lại mảng
      const index = userArr.findIndex(
        (userItem) => userItem.username === userActive.username
      );
      userArr[index] = userActive;
      saveTostorage("userArr", userArr);
      alert("cài đặt thành công !!!");
      inputPagesSize.value='';
      inputCatefory.value = "General";
    }
  });
  // nhập dữ liệu người dùng
  function validate() {
    let isValidate = true;
    // kiem tra
    if (Number.isNaN(Number.parseInt(inputPagesSize.value))) {
      alert("Số trang không hợp lệ!!!!!");
      isValidate = false;
    }
    // kiem tra input
    if (inputCatefory.value === "") {
      alert("Nhập cate mới!!!");
      isValidate = false;
    }
    return isValidate;
  }
} else {
  alert("Vui Lòng đăng nhập / đăng ký để truy cạp ứng dụng!!!");
  window.location.assign("../index.html");
}
