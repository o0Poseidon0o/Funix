import React from "react";
import CvHeader from "./compoments/header/cvHeader";
import Cvmenu from "./compoments/menu/CvMenu";
function App() {
  console.log(Cvmenu);
  return (
    <div>
      <CvHeader title="kiem tra props" />
      <Cvmenu></Cvmenu>
    </div>
  );
}
export default App;
