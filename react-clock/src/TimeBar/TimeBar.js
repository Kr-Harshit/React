import './TimeBar.css';
import React from 'react'

const timebar = (props) =>{
    let timeValues = null;
    //console.log(props.getValue)

    if(props.getValuesList.length > 0)
        timeValues = <ul>
            {props.getValuesList.map((time)=>{
                if(time === props.getValue)
                    return <li className="Current" key={time}>{time}</li>
            return <li key={time}>{time}</li>;
        })}
        </ul>
    
    return(
        <div className="TimeBar">
            {timeValues}
        </div>
    )
};

export default timebar;