import React, { useState } from "react";
import Expenses from "../src/components/Expenses/Expenses";
import NewExpense from "../src/components/NewExpense/NewExpense";
const DUMMY_EXPENSE = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];
function App() {
  const [expenses, setExpense] = useState(DUMMY_EXPENSE);
  const addExpenseHandler = (expense) => {
    setExpense((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );
  // return (
  //   <div>
  //     <div>
  //       <h2>LAB 1</h2>
  //       <p>Bài lab làm quen với React</p>
  //       <Expenses items={expenses} />
  //     </div>
  //   </div>
  // );
  // const addExpenseHandler = (expense) => {
  //   console.log("In App.js");
  //   console.log(expense);
  // };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses}></Expenses>
    </div>
  );
}

export default App;
