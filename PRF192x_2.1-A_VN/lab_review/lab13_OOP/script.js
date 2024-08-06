const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(1, 2, 3, 4, 5); // Cach khac de tao Arry
console.log(arr1, arr2);
const HTN = {
  name: "HTN",
  age: 24,
};
console.log(HTN);
// Prototype là nơi chứa các phương thức (method) ví dụ Arry có phương thúc concat, ForEach
// 1.constructor funtion(Tạo đối tượng từ 1 hàm)
const Person = function (name, age) {
  this.name = name;
  this.age = age;
  // tạo riêng cho từng đối tượng trong trong hàm
  this.getAge1 = function () {
    console.log(2022 - this.age);
  };
  this.tenTruong = "VTS";
};
const HTN1 = new Person("Le MInh Nhan", 1987);
console.log(HTN1);
console.log(arr1 instanceof Array); //Kiểm tra có phải Arry không
// Cách 2: Tạo bên ngoài hàm tạo dùng phương thức .prototype của hàm tạo.
Person.prototype.getName = function () {
  console.log(2022 - this.age);
};
HTN1.getName();
console.log(HTN);
// Cách 3: Dùng phương thức '__proto__' của đối tượng
HTN1.__proto__.test = function () {
  console.log("TEST");
};
HTN1.test();
// Cách 4: Tạo riêng trên từng đối tượng qua tên đối tượng(Object)
HTN1.id = 113;
console.log(HTN1);
// 2.Class ES6
// Có 2 cách tạo Class:
// Cách 1: Khai báo Class (declaration class):
class PersonCL {
  // Bắt buộc phải có contructor
  constructor(name, birthDay) {
    this.name = name;
    this.birthday = birthDay;
    this.method1 = function () {
      console.log("ABC");
    };
  }
  getAge1() {
    return 2022 - this.birthday;
  }
}
const HTN_Cl = new PersonCL("LMN", 24);
console.log(HTN_Cl);
// Thêm phương thức thủ công từ bên ngoài Class cũng tương tư tự như hàm
PersonCL.prototype.getAge1 = function () {
  console.log(2022 - this.birthday);
};
// Cách 2: biểu thức class(expression class)
const PersonCL2 = class {
  constructor(name, birthDay) {
    this.name = name;
    this.birthDay = birthDay;
  }
};

// 3.Object.create()

// Kế thừa với Contructor Functions dùng toán tử '.call
const Student = function (name, age, id) {
  Person.call(this, name, age);
  this.id = id;
};
// cách tạo  với Object.create
Student.prototype = Object.create(Person.prototype);
const hsX = new Student("NVB", 12, 187654);
console.log(hsX);
// Tổng kết
// có hai hàm A,B
// B sẽ kế thừa A
// A.call(this,...) bên trong hàm B
// tạo liên kết thủ công ===> B.prototype = Object.create(A.prototype)
// Kế thứ Class
class StudentCl extends PersonCL {
  constructor(name, birthDay, id) {
    // hàm super thay cho việc sử dụng phương thức call
    super(name, birthDay);
    this.id = id;
  }
  // ghi đè phương thức
  getAge1() {
    console.log(2023 - this.birthDay);
  }
}
// Lab 13.1
console.log("Tạo Objecj");
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}
Car.prototype.tangtoc = function () {
  this.speed += 10;
  console.log(`Toc do tang 10 ${this.speed}`);
};
Car.prototype.giamtoc = function () {
  this.speed -= 5;
  console.log(`Giam toc ${this.speed}`);
};
console.log(`Du lieu car 1:BMW đi với tốc độ 120km/h`);
const car1 = new Car("BMW", 120);
car1.tangtoc();
car1.giamtoc();
// Tạo đối tượng với Class
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    // speed là dạng m/s ==> đổi về km/h *1.6
    this.speed = speed * 1.6;
  }
  tangtoc() {
    this.speed += 10;
    console.log(`Toc do tang 10 ${this.speed}`);
  }
  giamtoc() {
    this.speed -= 5;
    console.log(`Giam toc ${this.speed}`);
  }
}
const CarCl1 = new CarCl("BMW", 120);
CarCl1.tangtoc();
CarCl1.giamtoc();
// lab13.2
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// Tạo phương thức liên kết thủ công
EV.prototype = Object.create(Car.prototype);
// Tạo thêm phuowgn thức mới
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.tangtoc = function () {
  this.speed += 20;
  this.charge--;
  console.log(this.charge);
};
// Test kế thừa
console.dir(EV);
const ev = new EV("Tesla", 120, 23);
ev.chargeBattery(30);
console.log("muc pin:", ev.charge);
ev.tangtoc(); // ghi đè phuowgn thức
ev.giamtoc();
// kế thừ theo class
class EVCL extends CarCl {
  #charge; //Tạo biến cục bộ
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  tangtoc() {
    this.speed += 20;
    this.#charge--;
    console.log(this.#charge);
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
  }
  get getCharge() {
    return this.#charge;
  }
}
const rivian = new EVCL("rica", 120, 23);
console.log(rivian);
