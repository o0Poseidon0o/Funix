import React from "react";

const AddUser = () => {
  return (
    <div className="flex flex-wrap mt-10">
      <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
        <p className="text-xl pb-6 flex items-center">
          <i className="fas fa-list mr-3"></i> Hình ảnh
        </p>
        <div className="leading-loose">
          <form className="p-10 bg-white rounded shadow-xl">
            <img
              src="https://ilarge.lisimg.com/image/21867558/1118full-hyakujuu-sentai-gaoranger-photo.jpg"
              alt="avatar"
            />
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p className="text-xl pb-6 flex items-center">
          <i className="fas fa-list mr-3"></i> Form User
        </p>
        <div className="leading-loose">
          <form className="p-10 bg-white rounded shadow-xl">
            <div className="">
              <label className="block text-sm text-gray-600" for="cus_name">
                Số hiệu
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                required=""
                placeholder="Your Name"
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" for="cus_email">
                họ và tên
              </label>
              <input
                className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Email"
              />
            </div>
            <div className="mt-2">
              <label className=" block text-sm text-gray-600" for="cus_email">
                Address
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="Street"
                aria-label="Email"
              />
            </div>
            <div className="mt-2">
              <label
                className="hidden text-sm block text-gray-600"
                for="cus_email"
              >
                City
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="City"
                aria-label="Email"
              />
            </div>
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label
                className="hidden block text-sm text-gray-600"
                for="cus_email"
              >
                Country
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="Country"
                aria-label="Email"
              />
            </div>
            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label
                className="hidden block text-sm text-gray-600"
                for="cus_email"
              >
                Zip
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                required=""
                placeholder="Zip"
                aria-label="Email"
              />
            </div>
            <p className="text-lg text-gray-800 font-medium py-4">
              Payment information
            </p>
            <div className="">
              <label className="block text-sm text-gray-600" for="cus_name">
                Card
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                required=""
                placeholder="Card Number MM/YY CVC"
                aria-label="Name"
              />
            </div>
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
