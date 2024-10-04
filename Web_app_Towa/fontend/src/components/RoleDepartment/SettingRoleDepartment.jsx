import React from "react";

const SettingRoleDepartment = () => {
  return (
    <div className="w-1/2 mt-8">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i> Danh sách nhân viên
      </p>
      <div className="bg-white overflow-auto">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Id Role
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Tên Role
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {/* hàng ngang 1 */}
            <tr className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">
                <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="KTSX">KTSX</option>
                  <option value="Option2">Option 2</option>
                  <option value="Option3">Option 3</option>
                </select>
              </td>

              <td className="py-4 px-6 border-b border-grey-light">
                <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="KTSX">Admin</option>
                  <option value="Option2">Option 2</option>
                  <option value="Option3">Option 3</option>
                </select>
              </td>
              <td className="py-4 px-6 border-b border-grey-light text-white">
                <div className="flex space-x-2">
                  <button className="bg-red-500 w-14 rounded shadow-md">
                    Sửa
                  </button>
                  <button className="bg-red-500 w-14 rounded shadow-md">
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingRoleDepartment;
