// Code đồng bộ: là code chạy từ trên xuống.
// Code bất đồng bộ: là code không chạy từ trên xuống
// Ví dụ bát đồng bộ:
console.log("lệnh 1");
console.log("lệnh 2");
console.log("lệnh 3");
setTimeout(function () {
  console.log("viec 4");
}, 3000); // cài Callback function để thực thi sau
console.log("Hoàn Thành!!!!!");
//AJAX
const myRequest = new XMLHttpRequest();
// 'Get' là gửi yêu cầu đến server
// true là xử lý bất đồng bộ, false xử lý  đồng bộ
myRequest.open("GET", "https://geocode.xyz/52.508,13.381?geoit=json"), true;
myRequest.send(); //Gửi request đến máy hủ
console.dir(myRequest);
myRequest.onload = function () {
  const data = myRequest.responseText; //gửi phản hồi responseText
  console.log(JSON.parse(myRequest.responseText).country);
  // console.log(data);
  // console.log(typeof data);
  // const data2 = JSON.parse(data);
  // console.log(data2);
  // document.querySelector("h2").textContent = data2.country;
  // console.log(data2.country);
};
// PROMISE
const soDoan = Number(prompt("Nhap so"));
const ketqua = 123456;
// Khai báo 1 promise. Promise nhận vào 2 tham số và 2 tham số này là 2 Callback function
const myPromise = new Promise(function ExcutorFunc(thanhcong, thatbai) {
  if (soDoan === ketqua) {
    const dataThanhCong = "ban da trung";
    thanhcong(dataThanhCong);
  } else {
    const dataThatBai = "may man lan sao";
    thatbai(dataThatBai);
  }
}); //===> sẻ tự động trả về 1 promise
console.log(myPromise);
// gọi phương thức then
const Promise_2 = myPromise.then(
  function thanhcong(dataThanhCong) {
    console.log(dataThanhCong);
  },
  function thatbai(dataThatBai) {
    console.log(dataThatBai);
  }
);
console.log(Promise_2);
// FETCH API
const myResponse = fetch("https://geocode.xyz/52.508,13.381?geoit=json");
// fetch sẽ trả về 1 promise
console.log(myResponse);
// để xử lý các trạng thái ta sẽ dùng các phương thức của promise
myResponse
  .then((res) => {
    // Phương thức .json sẽ trả về 1 promise và ở trạng thái thành công
    // nó sẽ trả về kết quả là data ta mong muốn123245
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
