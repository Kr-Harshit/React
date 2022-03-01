import React,  {useState} from 'react';

import TaskInput from './Component/TaskInput/TaskInput';
import TaskViewer from './Component/TaskViewer/TaskViewer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); 

  const addTaskHandler = (task) => {
    setTasks(prevState => {
      const updatedTaskList = [...prevState, task];
      return updatedTaskList;
    })
  } 

  const  removeTaskHandler = (taskid) => {
    console.log(taskid);
    setTasks(prevState => {
      prevState.splice(taskid-1, 1);
      const updatedTaskList = [...prevState];
      return updatedTaskList;
    })
  }

  return (
    <div className="App">
     <TaskInput addTask={addTaskHandler}/>
     <TaskViewer tasks={tasks} removeTask={removeTaskHandler}/>
    </div>
  );
}

export default App;
