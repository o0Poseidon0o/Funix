const obj = {
  a: {
    c: 3,
  },
  b: 2,
};

const obj2 = {
  //Chép obj
  ...obj,
  // Ghi đè a
  a: {
    // Chép obj.a
    ...obj.a,
    // Ghi đè c
    c: 42,
  },
};

const arr = ["a", "b"];
// Tạo một array mới thêm c vào cuối
const arr2 = arr.concat("c");
// Hoặc có thể copy mảng
const arr3 = arr.slice();

arr3.push("c");
