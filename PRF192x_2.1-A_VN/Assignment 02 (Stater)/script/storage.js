"use strict";
const tableBodyEl = document.getElementById("tbody");
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
// Lấy dữ liệu petArr
const breedArr = getFromStorage("breedArr");
const petArr = getFromStorage("petArr");
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
function renderBeed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter(
      (breedItem) => breedItem.typeBreed === "Dog"
    );
    console.log(breedDogs);
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.nameBreed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter(
      (breedItem) => breedItem.typeBreed === "Cat"
    );
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.nameBreed}`;
      breedInput.appendChild(option);
    });
  }
}

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
