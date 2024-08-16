import React from "react";

export default function Usercards() {
  return (
    <div className=" w=[36rem] bg-white p-12 flex justify-center">
      <img
        src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-anh-cute-anime-014.jpg"
        className="w-32 rounded-full border-[11px] boder-[#E6EFA] self-start "
        alt=""
      />
      <div className="space-y-7">
        <div>
          <h1 className="text-3xl font-bold">David grant</h1>
          <h2 className="mt-1">3D Artist</h2>
        </div>
        <div className="space-y-4">
          <p>4.7 rating</p>
          <p>4,447 Review</p>
          <p>478 Students</p>
        </div>
        <p>
          David Grant has been making video games for a living for.... David
                  
        </p>
        <button>Show more</button>
      </div>
    </div>
  );
}
