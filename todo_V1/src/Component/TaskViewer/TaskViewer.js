import React from 'react'
import TaskDetails from './TaskDetails/TaskDetails';
import './TaskViewer.css'

export default function TaskViewer(props) {
    const tasks = props.tasks.map((task, i) => <TaskDetails key={i} id={i+1} text={task['text']} deadline={task.deadline} 
    
    removeTask={props.removeTask} />)
    return (
        <div className="task-viewer" >
            {tasks}
        </div>
    )
}
