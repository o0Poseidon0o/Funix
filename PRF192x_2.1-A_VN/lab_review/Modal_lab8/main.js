"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClosemodal = document.querySelector(".close-modal");
const btnOpenmodal = document.querySelectorAll(".show-modal");

for (let i = 0; i < btnOpenmodal.length; i++)
  btnOpenmodal[i].addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnClosemodal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});
