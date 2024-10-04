import React from "react";

const Settinguser = () => {
  return (
    <div className="w-full mt-8">
      <p className="text-xl pb-3 flex items-center">
        <i className="fas fa-list mr-3"></i> Danh sách nhân viên
      </p>
      <div className="bg-white overflow-auto">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Hình ảnh
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Số hiệu
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Họ và tên
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Email
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Bộ phận
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Chức danh
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
                Hình ảnh Url
              </td>
              <td className="py-4 px-6 border-b border-grey-light">5738</td>
              <td className="py-4 px-6 border-b border-grey-light">Admin</td>
              <td className="py-4 px-6 border-b border-grey-light">
                admin@towa.com.vn
              </td>
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
            {/* hàng ngang 2 */}
            <tr className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">
                Hình ảnh Url
              </td>
              <td className="py-4 px-6 border-b border-grey-light">5738</td>
              <td className="py-4 px-6 border-b border-grey-light">Admin</td>
              <td className="py-4 px-6 border-b border-grey-light">
                admin@towa.com.vn
              </td>
              <td className="py-4 px-6 border-b border-grey-light">KTSX</td>
              <td className="py-4 px-6 border-b border-grey-light">Admin</td>
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
            <tr className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">Lian</td>
              <td className="py-4 px-6 border-b border-grey-light">Smith</td>
              <td className="py-4 px-6 border-b border-grey-light">
                622322662
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                jonsmith@mail.com
              </td>
            </tr>
            <tr className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">Lian</td>
              <td className="py-4 px-6 border-b border-grey-light">Smith</td>
              <td className="py-4 px-6 border-b border-grey-light">
                622322662
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                jonsmith@mail.com
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settinguser;
