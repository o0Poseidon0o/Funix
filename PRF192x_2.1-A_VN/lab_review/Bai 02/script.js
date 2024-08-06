const isLand = true;
let language = "Vietnamese";
const country = "vietnam";
const continent = "Asia";
const population = 99;
console.log(country, continent, population, language, isLand);
console.log(`Dân số bị chia thành 2 miền ${population / 2}`);
console.log(`Dân số tăng 1 ${population + 1}`);
if (population > 6) {
  console.log(`Dân số lớn hơn dân số Phần Lan!!!! `);
} else {
  console.log(`Không lớn hơn!!!!`);
}
let description =
  country + "and its" + population + "million people speak" + language;
console.log(description);
// template literal
let description1 = `${country} and its ${population}"million people speak" ${language}`;
console.log(description1);
if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million below average`
  );
}
//2.6
let markMass = 78,
  markHeight = 1.69;
let johnMass = 92,
  johnHeight = 1.95;
let markHigherBMI;

let markBMI = markMass / markHeight ** 2;
let johnBMI = johnMass / johnHeight ** 2;

markHigherBMI = markBMI > johnBMI;
if (markHigherBMI) {
  console.log(
    `Mark's BMI (${markBMI.toFixed(
      1
    )}) is higher than John's (${johnBMI.toFixed(1)})!`
  );
} else {
  console.log(
    `John's BMI (${johnBMI.toFixed(
      1
    )}) is higher than Mark's (${markBMI.toFixed(1)})!`
  );
}
