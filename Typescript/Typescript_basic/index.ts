// string types;
// var firstname: string = "john";
// firstname = 1; type 'number' is not assignable to type 'string'
let automobile = "BMW";
const city = "New York";
console.log(city);
let students = 32;
// let studentAsString= students.toString();
let studentAsString:string= students.toString();
console.log (typeof studentAsString)
// Ép kiểu string cho biến
// Number types
var age: number=32;
let year: number=2024;
const numberOfMembers=61;
// numberOfMembers=128; Cannot assign to 'numberOfMembers' because it is a constant
let stringToNumber:number = parseInt ("1985");
console.log(stringToNumber)
// Booleans
let isStudent:boolean=false;
const alwaysStudent = true;
let minimumAge:boolean =age>= 6 ? true:false;
console.log(minimumAge)

// null underfined
let user: undefined;
console.log(user);

let userRole:null;
userRole = null;
// console.log(userRole); biến userrole đã cùng trước đó do được gán null
console.log(userRole==user)
if(!userRole){
    console.log("this condition is true")
}
if(!user){
    console.log("this condition is true")
}

let message:string="Hello, TypeScript";
let age12:number=42
let isStudent12:boolean=true
let fetched:null=null
let user12:undefined = undefined
// let largeNumber:bigint=9007199254640991n
let unique:symbol= Symbol("uniqueSymbol")
console.log(age12)

let firstname:string = "Mark";
// firstname =123; Kiểu "number" is not assignable to type 'string'.
// firstname =[]; Kiểu 'never []' is not assignable to type 'string'.

let firstname1:any = "Mark";
firstname1 =123;
firstname1 =[];
