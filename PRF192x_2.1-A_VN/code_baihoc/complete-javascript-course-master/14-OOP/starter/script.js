'use strict';
const Person = function (firstName, birthYear) {
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // //Đừng bao giờ làm cách này
  // this.calcaAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};
const jonas = new Person('Jonas', 1991);
console.log(jonas);
// 1. tạo một Object {} rỗng
// 2. Hàm được gọi là rỗng,this = {}
// 3. {} linked to prototype
// 4. Hàm tự đôgn trả về.
const matila = new Person('Matila', 2017);
const jack = new Person('Jack', 1975);
console.log(matila, jack);
// Prototypes (Nguyên mẫu) tất cả cá hàm đều có thuộc tính gọi lag nguyên mẫu
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas.calcAge();
console.log(jonas.__proto__); //Xem nguyên mẫu của biến
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
// Class

class PresonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}
const jessica = new PresonCl('Jessics', 1996);
console.log(jessica);
jessica.calcAge();
