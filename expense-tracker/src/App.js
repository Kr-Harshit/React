import { useState } from "react";

import Expenses from "./components/Expense/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

function App() {
  const [expenses, setExpenses] = useState([]);

  const saveExpenseHandler = (expenseData) => {
    setExpenses((prevState) => {
      return [...prevState, expenseData];
    });
  };

  return (
    <div className="App">
      <NewExpense onSaveExpense={saveExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
