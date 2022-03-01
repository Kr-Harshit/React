import React from 'react';
import Clockhand from '../ClockHand/ClockHand'
// import classes from './Clock.css';

const clock = (props) =>{
    return(
        <div>
            <Clockhand getTime={props.hours} name="hours"/>
            <Clockhand getTime={props.minutes} name="minutes"/>
            <Clockhand getTime={props.seconds} name ="seconds"/>
        </div>
    );
}

export default clock;