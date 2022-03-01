import React, { useState } from "react";
import "./TaskInput.css";

export default function TaskInput(props) {
  const today = new Date();
  const currDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1 < 10 ? "0" : "") +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() < 10 ? "0" : "") +
    today.getDate();
  const currTime = today.getHours() + ":" + today.getMinutes();

  const [enteredText, setEnteredText] = useState("");
  const [enteredDate, setEnteredDate] = useState(currDate);
  const [enteredTime, setEnteredTime] = useState(currTime);

  const taskTextChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const deadlineDateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const deadlineTimeChangeHandler = (event) => {
    setEnteredTime(event.target.value);
  };

  const taskSubmitHandler = (event) => {
    event.preventDefault();

    const task = {
      text: enteredText,
      deadline: new Date(enteredDate + " " + enteredTime),
    };
    console.log(task);
    props.addTask(task);
  };

  return (
    <div className="task_input">
      <form onSubmit={taskSubmitHandler}>
        <input
          type="text"
          className="task_text"
          placeholder="Enter task here.."
          value={enteredText}
          onChange={taskTextChangeHandler}
          required
        />
        <label>Deadline</label>
        <div className="deadline">
          <input
            type="date"
            value={enteredDate}
            onChange={deadlineDateChangeHandler}
            style={{ width: "45%" }}
            required
          />
          <input
            type="time"
            value={enteredTime}
            onChange={deadlineTimeChangeHandler}
            style={{ width: "45%" }}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}
