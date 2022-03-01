import React, {useState, useEffect} from 'react'
import "./TaskDetails.css"

export default function TaskDetails(props) {
    console.log(props)

    const calculateTimeLeft = (date) => {
        const currDateTime = new Date().getTime();
        const distance = date - currDateTime;
        let timeLeft = {};

        if (distance > 0) {
            timeLeft = {
                days : Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds : Math.floor((distance % (1000 * 60)) / 1000)  
            }
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.deadline.getTime()))

    useEffect(() =>{
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(props.deadline.getTime()));
        }, 1000)

        return () => clearTimeout(timer);
    })

    const time = (timeLeft['days']?timeLeft['days'] + 'd ':'') + (timeLeft['hours']?timeLeft['hours'] + 'h ':'') + (timeLeft['minutes']?timeLeft['minutes'] + 'm ':'') +  (timeLeft['seconds']?timeLeft['seconds'] + 's ':'')

    console.log(timeLeft)
    if(!Object.keys(timeLeft).length)
    {
        props.removeTask(props.id)
    }

    return (
        <div className="task-details"> 
            <div className="task-container">
                <input type="checkbox" onClick={() => props.removeTask(props.id)} />
                {/* <div className="task-id">{props.id}</div> */}
                <p className="task-text">{props.text}</p>
            </div>
            <div className="task-time-container">
                <p>Time Left</p>
                <div className="task-time">
                    {time}
                </div>
            </div>
        </div>
    )
}
