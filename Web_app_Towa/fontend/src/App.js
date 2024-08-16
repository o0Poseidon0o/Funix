import React from "react";
import Layoutmenu from "./compoments/Layout/Layoutmenu";
import Headermain from "./compoments/Layout/Headermain";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trangchu from "./compoments/Pages/Trangchu"
import Quidinh from "./compoments/Pages/quidinh";
import Huongdan from "./compoments/Pages/huongdan";
import Thongbao from "./compoments/Pages/thongbao";
import Ungdung from "./compoments/Pages/ungdung";
import Congdoan from "./compoments/Pages/congdoan";
import Hinhanh from "./compoments/Pages/hinhanh";
import Admin from "./compoments/Pages/admin";


function App() {
  return (
      <Router>
        <Headermain></Headermain>
        <Layoutmenu></Layoutmenu>
        <Routes>
          <Route path="/" element={<Trangchu />}/>
          <Route path="/Quidinh" element={<Quidinh />}/>
          <Route path="/Huongdan" element={<Huongdan/>}/>
          <Route path="/Thongbao" element={<Thongbao/>}/>
          <Route path="/Ungdung" element={<Ungdung/>}/>
          <Route path="/Congdoan" element={<Congdoan/>}/>
          <Route path="/Hinhanh" element={<Hinhanh/>}/>
          <Route path="/Admin" element={<Admin/>}/>
        </Routes>
      </Router>
  );
}

export default App;
