"use strick";
const submitAnswer = document.querySelector(".btn__submit");
const displayResults = document.getElementById("show");
const poll = {
  question: "What is your favourite programming language? ",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  numberOfVotes: new Array(4).fill(0),
};

submitAnswer.addEventListener("click", function () {
  const registerNewAnswer = Number(
    prompt(
      "What is your favourite programming language? \n 0: JavaScript \n 1: Python \n 2: Rust \n 3: C++",
      "(Write option number)"
    )
  );
  kiemtra(registerNewAnswer);
  console.log(kiemtra(registerNewAnswer));
});
// Kiểm tra có nhập đúng không;
const kiemtra = function (a) {
  if (a === 0 || a === 1 || a === 2 || a === 3) {
    alert("Nhap dung roi");
    return a;
  } else {
    alert("Phai nhap lai");
    return false;
  }
};
