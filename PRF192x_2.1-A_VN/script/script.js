//switch
const day = "monday";
switch (day) {
  case "monday":
    console.log("ke hoach");
    console.log("nghi lam");
    break;
  case "Tuesday":
    console.log("Thứ ba");
    break;
  default:
    console.log("Not a valid day!");
}

// bat che do strict de tranh loi
("use strict");
function logger() {
  console.log("My name is Nhan");
}
logger();
// Hàm
function cutFruitPieces(fruit) {
  return fruit * 4;
}
function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  console.log(apples, oranges);
  const juice = `Juice with ${applePieces} apples and ${orangePieces} oragnes.`;
  return juice;
}
fruitProcessor(5, 0);
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
const apple0Juice = fruitProcessor(8, 2);
console.log(appleJuice);
console.log(cutFruitPieces(2, 3));

const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);
// Mảng
const friends = ["Nhan", "Thanh", "Danh", "Tam"];
console.log(friends);
const years = new Array(1991, 1994, 1996, 1995);
console.log(years);
console.log(years[2]);
console.log(years.length); // Độ dài của mảng
console.log(years[years.length - 1]); // Lấy 1 phẩn từ có độ dài của mảng -1
years[1] = 2022; //Thay một phần tử của mảng
console.log(years);

const firstName = "Nhan";
const nhan = [firstName, "Le", 2022 - 1987, "IT", years];
console.log(nhan);
console.log(nhan.length);

const calcAge4 = function (birthYear) {
  return 2022 - birthYear;
};
const years1 = [1990, 1967, 2001, 2002, 2010];
console.log(calcAge4(years)); //Không thể trừ mảng
console.log(calcAge4(years1[0]));
console.log(calcAge4(years1[1]));
console.log(calcAge4(years1[years1.length - 1]));

const years2 = [
  calcAge4(years1[0]),
  calcAge4(years1[1]),
  calcAge4(years1[years1.length - 1]),
];
console.log(years2);
