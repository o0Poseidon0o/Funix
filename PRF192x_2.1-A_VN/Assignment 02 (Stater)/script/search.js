"use strict";

const findBtn = document.getElementById("find-btn");
// click chọn loại pet
typeInput.addEventListener("click", renderBeed);
// Hiển thị toàn bộ thú cưng
// Hien thi danh sach thu cung
function renderTableSearch(a) {
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
  <td>${pet.date}</td>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableSearch(petArr);
// Sự kiện button Find
findBtn.addEventListener("click", function () {
  let findPetArr = petArr;
  if (idInput.value) {
    findPetArr = findPetArr.filter((pet) => pet.id.includes(idInput.value));
  }
  if (nameInput.value) {
    findPetArr = findPetArr.filter((pet) => pet.name.includes(idInput.value));
  }
  if (typeInput.value !== "Select Type") {
    findPetArr = findPetArr.filter((pet) => pet.Type === typeInput.value);
  }
  if (breedInput.value !== "Select Breed") {
    findPetArr = findPetArr.filter((pet) => pet.breed === breedInput.value);
  }
  if (vaccinatedInput.checked === true) {
    findPetArr = findPetArr.filter((pet) => pet.vacci === true);
  }
  if (dewormedInput.checked === true) {
    findPetArr = findPetArr.filter((pet) => pet.dewo === true);
  }
  if (sterilizedInput.checked === true) {
    findPetArr = findPetArr.filter((pet) => pet.sterilized === true);
  }
  renderTableSearch(findPetArr);
  clearInput();
});
// // Hàm hiển trị thời gian
// function displayTime(date){
//   if(typeof date ==='string'){
//     return date;
//   }else if(typeof date ==='object'){
//     return JSON.parse(JSON.stringify(date));
//   }
// }
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  
  breedInput.value = "Select Breed";
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  typeInput.value = "Select Type";
  vaccinatedInput.checked = false;
  
};
