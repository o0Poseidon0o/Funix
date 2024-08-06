"use strict";

const typeBreedinput = document.getElementById("input-type");

// Kiểm tra dữ liệu nhập
function validateData(data) {
  if (data.nameBreed === "") {
    alert("Phải nhập tên Breed!!!!");
  } else if (data.tpyeBreed === "Select Type") {
    alert("Phải nhập loại!!!!");
  } else {
    return true;
  }
}

// Nhập thông tin breed
submitBtn.addEventListener("click", function () {
  const data = {
    nameBreed: breedInput.value,
    typeBreed: typeBreedinput.value,
  };
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    renderTableBreed(data);
    clearInput();
  }
  saveToStorage("breedArr", breedArr);
  getFromStorage("breedArr");
  console.log(breedArr);
  console.log(data);
});

// Ham xoa du lieu dua ve ban dau
const clearInput = () => {
  breedInput.value = "";
  typeBreedinput.value = "Select Type";
};

// Hien thi danh sách loại
function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  breedArr.forEach(function (breed, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope = "col">${index + 1}</td>
    <td scope = "col">${breed.nameBreed}</td>
    <td scope = "col">${breed.typeBreed}</td>
    <td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breed.nameBreed
    }')">Delete</button>
    </td>
    `;
    tableBodyEl.appendChild(row);
  });
}
// Kiểm tra breed có tồn tại không
function checkID(breedId) {
  return breedArr.findIndex((x) => x.id === breedId);
}
// Xóa breed khi có tồn tại
function deleteBreed(breedId) {
  if (confirm("Are you sure?")) {
    breedArr.splice(checkID(breedId), 1);
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
    clearInput();
  }
}
