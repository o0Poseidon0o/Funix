import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";



export default function Headermain({ user = {}, onLogout }) {
  const navigate = useNavigate(); // Hook de dieu huong
  console.log("User in Headermain:", user); // Kiểm tra thông tin người dùng
  return (
    <div className="items-center flex bg-slate-400 h-auto p-2">
      <div className="flex-none w-40 h-14">
        <img
          src="/images/logo/logo_towa.png"
          alt="logo"
          className="w-40 h-15"
        />
      </div>
      <div className="grow h-auto items-center text-center text-3xl font-bold text-stone-100">
        <h1>CỔNG THÔNG TIN TOWA</h1>
      </div>
      <div className="flex-none w-14 h-14">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <img alt="" src={user.avatar} className="h-8 w-8 rounded-full" />
          </MenuButton>
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <MenuItem>
              <span className="block px-4 py-2 text-sm text-gray-700">
                {user.name ? `${user.name} (${user.role})` : "Loading..."}
              </span>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => navigate("/UserProfiles")}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Your Profile
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={onLogout}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
              >
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
