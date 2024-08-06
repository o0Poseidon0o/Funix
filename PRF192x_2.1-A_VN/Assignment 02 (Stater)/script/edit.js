"use strict";
const editForm = document.getElementById("container-form");

const dt = new Date();
let index = -1;
// kiểm tra data
function validateData(data) {
  if (data.id === "") {
    alert("ID must unique!");
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
  <td>${pet.date}</td>
  <td><button type="button" class="btn btn-danger" onclick="editPet('${
    pet.id
  }')">Edit</button>
  </td>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);
typeInput.addEventListener("click", renderBeed);
// Nhập dữ liệu pet đã chọn vào form
function editPet(petId) {
  // hiện form nhập liệu
  editForm.classList.remove("hide");

  // lấy vị trí pet trong mảng
  index = petArr.findIndex((e) => e.id === petId);

  //Nhập dữ liệu vào form
  const pet = petArr[index];
  idInput.value = petId;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.Type;
  breedInput.value = `${pet.breed}`;
  weightInput.value = pet.weight;
  lengthInput.value = pet.Length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
}
//Sự kiện button submit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    Type: typeInput.value,
    weight: weightInput.value,
    Length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: dt.toLocaleDateString("vi-VI"),
  };
  // Lưu lại thông tin mới
  const validate = validateData(data);
  if (validate) {
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    clearInput();
    editForm.classList.add("hide");
  }
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
