import React from 'react';
import TimeBar from '../TimeBar/TimeBar';
import './Clockhand.css'

const clockHand = (props) =>{
    
    let bar1Value = Math.floor(props.getTime/10);
    let bar2Value = props.getTime % 10;
    let valueList = null;

    // console.log(bar1Value);

    if(props.name === 'hours')
        valueList = [0,1,2];
    else
        valueList = [0,1,2,3,4,5]
        

    return(
        <div className="ClockHand">
            <TimeBar getValue={bar1Value} getValuesList={valueList}/>
            <TimeBar getValue={bar2Value} getValuesList={[0,1,2,3,4,5,6,7,8,9]}/>
        </div>
    )
};

export default clockHand;