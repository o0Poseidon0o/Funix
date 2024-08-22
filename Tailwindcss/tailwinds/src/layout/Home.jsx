import React from "react";

export default function Home() {
  return (
    <div>
      <h1 className=" text-3xl text-center font-meri">Tailwindcss</h1>
      <div>
        <h1> Cài đặt ReactJS</h1>
        <span>npx create-react-app my-project</span>
      </div>
      <div>
        <h1 className=" text-3xl text-center">Cài đặt tailwinds</h1>
        <span>cd my-project npm install -D tailwindcss</span>
        <span>npx tailwindcss init</span>
      </div>
      <div>
        <h1>Cấu hình file tailwind.config.js</h1>
        <p>Configure your template paths
        Add the paths to all of your template files in your tailwind.config.js file</p>
      </div>
      
    </div>
  );
}
