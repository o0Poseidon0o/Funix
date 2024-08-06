"use strict";
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const inputFile = document.getElementById("input-file");
let resultArr = [];

//Sự kiện button export file
exportBtn.addEventListener("click", function () {
  const fileSave = new Blob([JSON.stringify(petArr)], {
    type: "application/json",
  });
  saveAs(fileSave, "static.json");
});

//ADD array Pet
function addPet(arr) {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      checkID(arr[i].id) > -1
        ? (petArr[checkID(arr[i].id)] = arr[i])
        : petArr.push(arr[i]);
    }
    saveToStorage("pet", petArr);
  }
}

//Sự kiện khi button import file
importBtn.addEventListener("click", function () {
  const file = inputFile.files[0];
  let arr = [];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (e) {
      arr = JSON.parse(e.target.result);
      addPet(arr);
    };
    reader.onerror = function (evt) {
      document.getElementById("fileContents").innerHTML = "error reading file";
    };
  }
});
