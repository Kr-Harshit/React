import {
  ListItem,
  ListItemText,
  Collapse,
  FormControl,
  InputLabel,
  Input,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState, useEffect } from "react";

import "./Todo.css";
import firebase from "firebase";
import db from "./firebase";

const calculateProgress = (arr) => {
  const totalLength = arr.length;
  if (totalLength === 0) return 0;
  let checked = 0;
  for (let i = 0; i < totalLength; i++) if (arr[i]) checked++;

  return (checked * 100) / totalLength;
};

const useStyle = makeStyles({
  completed: {
    background: "#5cb85cb4",
  },
});

const calculateTimeLeft = (date) => {
  const currDate = new Date();
  const difference = date.toDate() - currDate;
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hr: Math.floor((difference / (1000 * 60 * 60)) % 24),
      min: Math.floor((difference / 1000 / 60) % 60),
      sec: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(props.task);
  const [subTasks, setSubTasks] = useState(props.subTasks);
  const [subTasksStatus, setSubTasksStatus] = useState(props.subTasksStatus);
  const [progress, setProgress] = useState(
    calculateProgress(props.subTasksStatus)
  );
  const [deadline, setDeadline] = useState(calculateTimeLeft(props.deadline));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeadline(calculateTimeLeft(props.deadline));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const updateTaskHandler = (event) => {
    event.preventDefault();
    console.log(task);
    db.collection("todos").doc(props.id).update({
      todo: task,
      subTasks: subTasks,
      subTasksStatus: subTasksStatus,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setOpen((prevState) => !prevState);
  };

  const checkTaskHandler = (idx) => {
    setSubTasksStatus((prevState) => {
      prevState[idx] = !prevState[idx];
      setProgress(calculateProgress(prevState));
      return prevState;
    });

    db.collection("todos").doc(props.id).update({
      todo: task,
      subTasks: subTasks,
      subTasksStatus: subTasksStatus,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const timer = [];

  Object.keys(deadline).forEach((interval, id) => {
    if (!deadline[interval]) return;
    timer.push(
      <span key={id}>
        {deadline[interval]}
        {interval}{" "}
      </span>
    );
  });

  const classes = useStyle();
  calculateTimeLeft(props.deadline);
  return (
    <>
      <Grid container>
        <Grid item xs={11}>
          <ListItem className="todo_item">
            <Accordion
              className={`todo_task ${
                progress === 100 ? classes.completed : ""
              }`}
            >
              <AccordionSummary
                expandIcon={subTasks.length > 0 ? <ExpandMoreIcon /> : ""}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemText
                  primary={task}
                  secondary={timer.length ? timer : <span>Time's up!</span>}
                ></ListItemText>
              </AccordionSummary>

              {subTasks.length > 0 ? (
                <AccordionDetails className="sub_task_viewer">
                  <p className="sub_task_header">Sub tasks</p>
                  <ul>
                    {subTasks.map((subTask, idx) => (
                      <li className="sub_task_item" key={idx}>
                        <input
                          type="checkbox"
                          className="check_sub_task"
                          checked={subTasksStatus[idx]}
                          onChange={(e) => checkTaskHandler(idx)}
                        />
                        <p style={{ color: "black" }}>{subTask}</p>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              ) : (
                ""
              )}
            </Accordion>
          </ListItem>
        </Grid>
        <Grid item xs={1} className="task-icons">
          <EditIcon
            className="icon"
            onClick={(e) => setOpen((prevState) => !prevState)}
          />

          <DeleteIcon
            className="icon"
            onClick={(event) => db.collection("todos").doc(props.id).delete()}
          />
        </Grid>
      </Grid>

      <Collapse in={open} timeout="auto">
        <form onSubmit={updateTaskHandler} className="update-form">
          <FormControl>
            <InputLabel htmlFor={`update-task-${props.id}`}>Task</InputLabel>
            <Input
              id={`update-task-${props.id}`}
              type="text"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
          </FormControl>
          {/* 
          {subTasks.length > 0
            ? subTasks.map((subTask, idx) => (
                <FormControl key={idx}>
                  <InputLabel htmlFor={`update-subtask-${props.id}-${idx}`}>
                    Sub Task
                  </InputLabel>
                  <Input
                    id={`update-subtask-${props.id}-${idx}`}
                    type="text"
                    value={subTask}
                    onChange={(event) => setTask(event.target.value)}
                  />
                </FormControl>
              ))
            : ""} */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!task}
          >
            update
          </Button>
        </form>
      </Collapse>
    </>
  );
}

export default Todo;
