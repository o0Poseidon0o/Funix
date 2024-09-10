import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

export default function Ungdung() {
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch("/application.json")  // Đọc file JSON từ thư mục public
  //         .then(response => response.json()) // Chuyển đổi dữ liệu JSON thành JavaScript object
  //         .then(json => setData(json))  // Cập nhật state với dữ liệu JSON
  //         .catch(error => console.error("Có lỗi xảy ra khi fetch dữ liệu: ", error));
  // }, []);

  // useEffect(() => {
  //   fetch("/data/application.json")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.text(); // Đọc dữ liệu dưới dạng văn bản
  //     })
  //     .then((text) => {
  //       console.log("Received text:", text); // Log dữ liệu nhận được
  //       return JSON.parse(text); // Chuyển đổi văn bản thành JSON
  //     })
  //     .then((json) => setData(json))
  //     .catch((error) =>
  //       console.error("Có lỗi xảy ra khi fetch dữ liệu: ", error)
  //     );
  // }, []);

  useEffect(() => {
    fetch("/data/application.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Đọc dữ liệu JSON
      })
      .then((json) => setData(json))
      .catch((error) =>
        console.error("Có lỗi xảy ra khi fetch dữ liệu: ", error)
      );
  }, []);
  return (
    <section className="bg-white  py-24 px-4 lg:px-16">
      <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
        <h1 className="text-center text-5xl pb-12">Danh sách ứng dụng</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16 p-9">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <Link to={item.href} className="block">
                <div className="h-28">
                  <div className="absolute -top-20 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                    <img
                      src={item.img}
                      className="w-36 h-36 mt-6 m-auto"
                      alt={item.p}
                      title={item.p}
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div className="p-6 z-10 w-full">
                  <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                    {item.p}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
