"use strict";

// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// Khai báo biến để lấy các Element.

const healthyPetBtn = document.getElementById("healthy-btn");
const calcBMI = document.getElementById("BMI-btn");
const dt = new Date();

// Kiem tra du lieu nhap vao
function validateData(data) {
  if (data.id === "") {
    alert("ID must unique!");
    idInput.focus();
  } else if (checkID() === true) {
    alert("Bị trùng ID nhập ID khác");
    idInput.focus();
  } else if (data.age < 1 || data.age > 15 || !data.age) {
    alert("Age must be between 1 and 15!");
    ageInput.focus();
  } else if (data.weight < 1 || data.weight > 15 || !data.weight) {
    alert("Weight must be between 1 and 15!");
    weightInput.focus();
  } else if (data.Length < 1 || data.Length > 100 || !data.Length) {
    alert("Length must be between 1 and 100!");
    lengthInput.focus();
  } else if (data.Type === "Select Type") {
    alert("Please select Type!");
    typeInput.focus();
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    breedInput.focus();
  } else {
    return true;
  }
  // Kiểm tra có trùng ID không
  function checkID() {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        return true;
      }
    }
  }
}

// Người dùng bấm vào submit để nhập thông tin thú cưng.
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    Type: typeInput.value,
    weight: parseInt(weightInput.value),
    Length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vacci: vaccinatedInput.checked,
    dewo: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: dt.toLocaleDateString("vi-VI"),
  };

  const validate = validateData(data);
  // Nhạp gia tri 1 petArr;
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
  saveToStorage("petArr", petArr);
  getFromStorage("petArr");
  console.log(petArr);
  console.log(data);
});
// Ham xoa du lieu dua ve ban dau
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  typeInput.value = "Select Type";
  vaccinatedInput.checked = false;
  colorInput.value = "#000000";
};

// Xóa pet khi có tồn tại
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    petArr.splice(checkID(petId), 1);
    saveToStorage("petArr", petArr);
    getFromStorage("petArr");
    renderTableData(petArr);
  }
}
// Kiểm tra sức khỏe của pet
let healthyCheck = false;
healthyPetBtn.addEventListener("click", function () {
  const healthyPetArr = petArr.filter(
    (pet) => pet.vacci && pet.dewo && pet.sterilized
  );
  healthyCheck = healthyCheck ? false : true;
  if (healthyCheck) {
    renderTableData(healthyPetArr);
    healthyPetBtn.textContent = "Show All Pet";
  } else {
    renderTableData(petArr);
    healthyPetBtn.textContent = "Show Healthy Pet";
  }
});
// Chỉ số trung bình của thú cưng
calcBMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    const pet = petArr[i];
    if (pet.type === "Dog")
      pet.bmi = ((pet.weight * 703) / pet.Length ** 2).toFixed(2);
    else pet.bmi = ((pet.weight * 886) / pet.Length ** 2).toFixed(2);
  }
  renderTableData(petArr);
});
// Khi chọn Type input
typeInput.addEventListener("click", renderBeed);


console.log(breedArr);
console.log(petArr);
