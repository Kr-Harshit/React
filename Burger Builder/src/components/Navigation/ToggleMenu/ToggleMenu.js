import React from 'react';

import classes from "./ToggleMenu.module.css"

const ToggleMenu = (props) => {

    let toggleIcon = <i className="fas fa-bars"></i>;

    if(props.toggleState === true)
        toggleIcon = <i className="fas fa-times" style={{color:'black'}}></i>;
        
    return (
        <div className={[classes.ToggleMenu, classes.MoboOnly].join(' ')} onClick={props.toggle}>
            {toggleIcon}
        </div>
    );
};

export default ToggleMenu;