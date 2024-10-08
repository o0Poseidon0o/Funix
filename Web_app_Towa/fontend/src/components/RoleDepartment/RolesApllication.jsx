import React from "react";

const RolesApllication = () => {
  return (
    <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
        <p className="text-xl pb-6 flex items-center">
          <i className="fas fa-list mr-3"></i> Roles User
        </p>
        <div className="leading-loose">
          <form className="p-10 bg-white rounded shadow-xl">
            <div className="">
              <label className="block text-sm text-gray-600" for="cus_name">
                ID của Roles
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                required=""
                placeholder="Id Role"
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" for="cus_email">
                Tên Role
              </label>
              <input
                className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                required=""
                placeholder="Tên Role"
                aria-label="Name_Role"
              />
            </div>

            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        </div>
  );
};

export default RolesApllication;
