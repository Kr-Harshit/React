import { useState } from "react";

import ExpenseForm from "./ExpenseFrom/ExpenseForm";
import Card from "../UI/Card/Card";
import "./NewExpense.css";

function NewExpense(props) {
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm(true);
  };

  const addExpenseHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onSaveExpense(expenseData);
  };

  let form = (
    <div className="new-expense bg-none">
      <button onClick={showFormHandler}>Add New Expense</button>
    </div>
  );

  if (showForm)
    form = (
      <Card className="new-expense">
        <ExpenseForm onAddExpense={addExpenseHandler} />
      </Card>
    );

  return form;
}

export default NewExpense;
