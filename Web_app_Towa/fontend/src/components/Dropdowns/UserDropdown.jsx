import React, { useState, createRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();

  useEffect(() => {
    if (isDropdownOpen && btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start", // Vị trí của dropdown bên dưới avatar
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10], // Điều chỉnh khoảng cách giữa avatar và dropdown
            },
          },
        ],
      });
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <a
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className="text-blueGray-500 block"
      >
        <div className="avatar online">
          <div className="w-24 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="avatar"
            />
          </div>
        </div>
      </a>

      <div
        ref={popoverDropdownRef}
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } bg-white z-50 py-2 list-none rounded shadow-lg min-w-48`}
        style={{ position: "absolute" }} // Chắc chắn rằng dropdown có `position: absolute`
      >
        {["Action", "Another action", "Something else here", "Separated link"].map(
          (item, index) => (
            <a
              key={index}
              href="#"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              onClick={(e) => e.preventDefault()}
            >
              {item}
            </a>
          )
        )}
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
      </div>
    </>
  );
};

export default UserDropdown;
