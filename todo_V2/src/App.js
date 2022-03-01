import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./App.css";
import firebase from "firebase";

import db from "./firebase";
import Todo from "./Todo";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    // getting data from database on the first load of app.js
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              task: doc.data().task,
              deadline: doc.data().deadline,
              subTasks: doc.data().subTasks,
              subTasksStatus: doc.data().subTasksStatus,
            };
          })
        );
      });
  }, []);

  const addTodoHandler = (event) => {
    event.preventDefault();
    const newTask = {
      task: task,
      subTasks: subTasks,
      subTasksStatus: Array(subTasks.length).fill(false),
      deadline: deadline,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("todos").add(newTask).then(console.log("task added"));

    setTask("");
    setSubTasks([]);
    setSubTask("");
  };

  const addSubTaskHandler = (event) => {
    setSubTasks((prevState) => [...prevState, subTask]);
    setSubTask("");
  };

  const removeSubTaskHandler = (id) => {
    console.log(id);
    setSubTasks((prevState) => {
      const tasks = [...prevState];
      tasks.splice(id, 1);
      return tasks;
    });
  };

  return (
    <div className="App">
      <div
        className={`task-adder-viewer  ${subTasks.length > 0 ? "active" : ""}`}
      >
        <form onSubmit={addTodoHandler}>
          <Grid container spacing={2}>
            <Grid item xs={8} className="left">
              <FormControl className="input">
                <InputLabel htmlFor="task-adder">Enter Task</InputLabel>
                <Input
                  id="task-adder"
                  type="text"
                  value={task}
                  onChange={(event) => setTask(event.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4} className="right">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  value={deadline}
                  variant="inline"
                  onChange={(e) => setDeadline(e._d)}
                  label="Set Deadline"
                  onError={console.log}
                  minDate={new Date()}
                  format="DD/MM/yyyy   hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={8} className="left">
              <div className="sub-task">
                <FormControl className="input">
                  <InputLabel htmlFor="todo-adder">Enter Sub Task</InputLabel>
                  <Input
                    id="todo-adder"
                    type="text"
                    value={subTask}
                    onChange={(event) => setSubTask(event.target.value)}
                  />
                </FormControl>
                <IconButton
                  disabled={!subTask}
                  onClick={addSubTaskHandler}
                  style={{ padding: 0 }}
                >
                  <AddCircleIcon className="form-icon" />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={4} className="right">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!task}
              >
                Add Todo
              </Button>
            </Grid>
          </Grid>
        </form>

        <List className="todo_list">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              task={todo.task}
              subTasks={todo.subTasks}
              id={todo.id}
              deadline={todo.deadline}
              subTasksStatus={todo.subTasksStatus}
            ></Todo>
          ))}
        </List>
      </div>
      <div className={`sub-task-drawer ${subTasks.length > 0 ? "active" : ""}`}>
        <ul>
          {subTasks.map((task, id) => (
            <ListItem key={id}>
              <ListItemIcon>
                <RemoveCircleOutlineOutlinedIcon
                  className="remove_icon"
                  onClick={(e) => removeSubTaskHandler(id)}
                />
              </ListItemIcon>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
