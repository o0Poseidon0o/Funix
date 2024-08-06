// saveToStorage: Hàm nhận hai tham số là Key và Vaule,
//  sau đó sẽ thực hiện việc lưu xuống LocalStorage.
export const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

//getFromStorage: Hàm nhận vào tham số là Key,
// sau đó sẽ lấy dữ liệu từ LocalStorage theo Key tương ứng.
export const getFromStorage = function (key) {
  // Khi storage có dữ liệu thì đổi định dạng của dữ liệu thành mảng
  //còn không thì để mảng rỗng
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};
export const userArr = getFromStorage("user");
export const currentUserArr = getFromStorage("current");
export const cartArr = getFromStorage("cart");
