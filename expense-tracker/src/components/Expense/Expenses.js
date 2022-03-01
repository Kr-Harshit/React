import { useState } from "react";

import ExpenseItem from "./ExpenseItem/ExpenseItem";
import Card from "../UI/Card/Card";
import ExpenseFilter from "./ExpenseFilter/ExpenseFilter";
import "./Expenses.css";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState(new Date().getFullYear());

  const changeFilterHandler = (selectedYear) => {
    setFilteredYear(parseInt(selectedYear));
  };

  const expenseList = props.items
    .filter((item) => item.date.getFullYear() === filteredYear)
    .map((item) => (
      <ExpenseItem
        key={item.id}
        title={item.title}
        amount={item.amount}
        date={item.date}
      />
    ));

  return (
    <Card className="expenses-list">
      <ExpenseFilter
        selectedYear={filteredYear}
        onChangeFilter={changeFilterHandler}
      />
      {expenseList}
    </Card>
  );
}

export default Expenses;
