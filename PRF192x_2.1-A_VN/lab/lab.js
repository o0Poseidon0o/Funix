"use strict";
// lab1
let country = "country";
let continent = "continent";
let population = 99188752;
console.log(country);
console.log(continent);
console.log(population);
//lab2
const isIsland = false;
let language = "Vietnamese";
console.log(isIsland);
console.log(language);
//lab2.3
let populationChia2 = population / 2;
console.log(populationChia2);
populationChia2 += 1;
console.log(populationChia2);
if (populationChia2 >= 6000000) {
  console.log("Dan so lớn hơn 6 triệu dân");
} else {
  console.log("Dan so nho hon 6 triệu dâns ");
}
if (populationChia2 >= 33000000) {
  console.log("Dan so lớn hơn mức trung binnh 33 trieu dân");
} else {
  console.log("Dan so nho hon mức trung bình 33 triệu dân ");
}

let description =
  country + " and its " + population + " million people speak " + language;
console.log(description);

let descriptionNew = `${country} and its ${population} million people speak ${language}`;
console.log(descriptionNew);
if (population >= 33000000) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33000000 - population} million below average`
  );
}
//lab3
var a = "9" - "5";
console.log(a);
var a = Boolean("123" < 57);
console.log(a);

// const numNeighours = Number(
//   prompt("How many neighbor countries does your country have?")
// );
// // if (numNeighours == 1) {
// //   console.log("Only 1 border!");
// // } else if (numNeighours > 1) {
// //   console.log("More than 1 border");
// // } else {
// //   console.log("No borders");
// // }
// if (numNeighours === 1) {
//   console.log("Only 1 border!");
// } else if (numNeighours > 1) {
//   console.log("More than 1 border");
// } else if (numNeighours === 0) {
//   console.log("No borders");
// }

const ngonNgu = prompt("Ngôn ngữ là gì");
const danSo = prompt("Dân số bao nhiêu");
const daoQuoc = Boolean(prompt("Có phải đảo Quốc không???"));

if (ngonNgu == "English" && danSo == 50 && daoQuoc === true) {
  console.log("You should live in Portugal:)");
} else {
  console.log("Portugal does not meet your criteria :(");
}

switch (ngonNgu) {
  case "Chinese or Mandarin":
    console.log("MOST number of native speakers!");
    break;
  case "Spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "English":
    console.log("3rd place");
    break;
  case "Hindi":
    console.log("Number 4");
    break;
  case "Arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}
// Toán tử 3 ngôi
danSo > 33
  ? console.log("Portugal's population is above average.")
  : console.log("Portugal's population is below average.");
// lab4
// lab4.1
function descriptionCountry(country, population, capitalCity) {
  const finish = `${country} has ${population} million people and its capital city is ${capitalCity}`;
  return finish;
}

console.log(descriptionCountry("Finland", 6, "Helsinki"));
console.log(descriptionCountry("France", 7, "Lyon"));
console.log(descriptionCountry("Viet Nam", 8, "TPHCM"));
// lab4.2
function percentageOfWorld1(population) {
  const percent = ((population / 7.9) * 100).toFixed(2);
  return percent;
}
const populationWorld = prompt("Nhap vao dan so can tinh 1");
const populationWorld1 = prompt("Nhap vao dan so can tinh 2");
const populationWorld2 = prompt("Nhap vao dan so can tinh 3");
console.log(
  `Quốc gia có ${populationWorld} tỷ người, chiếm ${percentageOfWorld1(
    populationWorld
  )} % dân số thế giới`
);
console.log(
  `Quốc gia có ${populationWorld1} tỷ người, chiếm ${percentageOfWorld1(
    populationWorld1
  )} % dân số thế giới`
);
console.log(
  `Quốc gia có ${populationWorld2} tỷ người, chiếm ${percentageOfWorld1(
    populationWorld2
  )} % dân số thế giới`
);
// lab4.3
const percentageOfWorld2 = (populationWorld, population) =>
  `Quốc gia có ${populationWorld} tỷ người, chiếm ${(
    (population / populationWorld) *
    100
  ).toFixed(2)} % dân số thế giới`;
console.log(percentageOfWorld2(7.9, 4.3));
console.log(percentageOfWorld2(7.9, 2.3));
console.log(percentageOfWorld2(7.9, 1.5));
// lab4.4
const percentageOfWorld3 = (country, population) =>
  `${country} has ${population} million people, which is about ${percentageOfWorld1(
    population
  )}% of the world`;
console.log(percentageOfWorld3("Germany", 4.6));
console.log(percentageOfWorld3("France", 3.6));
console.log(percentageOfWorld3("Finland", 1.6));
// lab4.5
const populations = [3.2, 2.8, 1.7, 5.4];
if (populations.length === 4) {
  console.log("True");
} else {
  console.log("False");
}

const perentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];
console.log(perentages);
// lab4.6
const neighbours = ["Lao", "Campuchia", "Thailan"];
console.log(neighbours);
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
// Còn chưa làm xong
// - Nếu array 'neighbours' không chứa nước 'Germany', hãy in ra console rằng:
// 'Probably not a central European country :D'.
// - Thay đổi tên của một trong các nước láng giềng của bạn. Để thực hiện điều đó, hãy tìm chỉ mục của đất nước trong array
// 'neighbours', rồi sử dụng nó để thay đổi array ở vị trí chỉ mục đó. Chẳng hạn, nếu bạn tìm thấy 'Sweden' trong array, hãy thay nó bằng 'Republic of Sweden'.

// lab5
// lab5.1
const myCountry = {
  country: "Viet nam",
  language: "Viet nam",
  population: 4.6,
  neighbours: ["Lao", "Campuchia", "Thailan"],
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called Helsinki.`
    );
  },
  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? true : false;
  },
};
console.log(
  `${myCountry.country}has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called Helsinki.`
);
console.log(myCountry.population + 2);
console.log(myCountry);
const population1 = "population";
console.log(myCountry[population1]);
myCountry.describe();
myCountry.checkIsland();
// lab 5.4
for (let i = 1; i <= 50; i++) {
  console.log(`Voter number ${i} is currently voting`);
}
//  lab5.5
const percentages2 = [];
for (let i = 0; i < populations.length; i++) {
  percentages2.push(percentageOfWorld1(populations[i]));
}
console.log(percentages2);
// lab5.6
const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];
for (let i = 0; i < listOfNeighbours.length; i++) {
  for (let j = 0; j < listOfNeighbours[i].length; j++) {
    console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
  }
}
//lab5.7
const percentages3 = [];
var i = 0;
while (i < populations.length) {
  percentages3.push(percentageOfWorld1(populations[i]));
  i++;
}
console.log(percentages3);

// lab6
const nhietdo1 = [17, 21, 23];
const nhietdo2 = [12, 5, -5, 0, 4];
console.log(
  `.. ${nhietdo1[0]}ºC in 1 day ... ${nhietdo1[1]}ºC in 2 days ... ${nhietdo1[2]}ºC in 3 days ...`
);

const printForecast = function (kiemtra) {
  console.log(kiemtra);
  console.warn(kiemtra);
  console.error(kiemtra);
};
console.log(printForecast(nhietdo1));
console.log(printForecast(nhietdo2));
