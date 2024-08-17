import React from "react";
import Menu from "./compoments/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usercards from "./layout/Usercards";
import Search from "./layout/Search";
import Home from "./layout/Home";

function App() {
  return (
    <Router>
      <Menu></Menu>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Usercards" element={<Usercards />} />
        <Route path="/Search" element={<Search />} />
        
      </Routes>
      
    </Router>
    
  );
}

export default App;
