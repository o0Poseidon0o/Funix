"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();
// Hiển thị trang home
function displayHome() {
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // Thêm thông báo welcome
    welcomeMessage.textContent = `Xin chào bạn ${userActive.firstname} đã đăng nhập thành công`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
// Sự kiện logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn có chắc là muốn logout không!!!");
  if (isLogout) {
    userActive = null;
    saveTostorage("userActive", userActive);
    displayHome();
  }
});
