import React from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  console.log(<ExpenseDate></ExpenseDate>);
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        {/* Tất cả props trong file ExpenseDate gồm month, day, year */}
        <div className="expense-item__description">
          <h2>{props.title}</h2>0
          {/* props nọi dung được truyền và từ file khác vào */}
          <div className="expense-item__price">${props.amount}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
