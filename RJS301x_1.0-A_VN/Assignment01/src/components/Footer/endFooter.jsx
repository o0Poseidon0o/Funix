import React from "react";
import "./endFooter.css";

const EndFooter = (props) => {
  return (
    <div className="container  col_endfooter">
      <ul>
        {props.item.map((item) => (
          <li>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EndFooter;
