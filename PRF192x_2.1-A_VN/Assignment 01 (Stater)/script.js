"use strict";

// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});
const petArr = [];
// Khai báo biến để lấy các Element.
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
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
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    ageInput.focus();
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    weightInput.focus();
  } else if (data.Length < 1 || data.Length > 100) {
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

  console.log(petArr);
  console.log(data);
});
// Hien thi danh sach thu cung
function renderTableData(a) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < a.length; i++) {
    const pet = a[i];
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
  <td>${pet.name}</td>
  <td>${pet.age}</td>
  <td>${pet.Type}</td>
  <td>${pet.weight} kg</td>
  <td>${pet.Length} cm</td>
  <td>${pet.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
  </td>
  <td><i class="bi ${
    pet.vacci ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.dewo ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td>${pet.bmi}</td>
  <td>${pet.date}</td>
  <td><button type="button" class="btn btn-danger" onclick="deletePet('${
    pet.id
  }')">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
  }
}

// Kiểm tra ID pet có tồn tại không
function checkID(petId) {
  return petArr.findIndex((x) => x.id === petId);
}
// Xóa pet khi có tồn tại
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    petArr.splice(checkID(petId), 1);
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
