"use strict";
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  // Hiển thị thoogn tin todo
  function displayTodoList() {
    let html = "";
    // Từ mảng todoArr lọc ra các todo
    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach(function (todo) {
        html += `<li class=${todo.isDone ? "check" : ""}>${
          todo.task
        }<span class='close'>x</span></li>`;
      });
    todoList.innerHTML = html;
    eventToggleTask();
    eventDeleteTasks();
  }
  // Thêm task
  btnAdd.addEventListener("click", function () {
    // Kiểm tra người dùng đã nhập chưa
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ!!!");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);
      // Thêm task mới vào mảng todoArr
      todoArr.push(todo);
      saveTostorage("todoArr", todoArr);
      displayTodoList();
      // reset dữ liệu vừa nhập
      inputTask.value = "";
    }
  });
  //toggle Tasks
  function eventToggleTask() {
    // Lấy tất cả phần tử ra
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // tránh nút delete ==>để không bị chống sự kiện
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          saveTostorage("todoArr", todoArr);
        }
      });
    });
  }
  // xóa task
  function eventDeleteTasks() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        const isDelete = confirm("Bạn có muốn xóa không???");
        if (isDelete) {
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          todoArr.splice(index, 1);
          saveTostorage("todoArr", todoArr);
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
  window.location.assign("../index.html");
}
