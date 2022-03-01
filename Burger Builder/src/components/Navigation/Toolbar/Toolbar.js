import React from 'react';

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import ToggleMenu from "../ToggleMenu/ToggleMenu";

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <ToggleMenu toggle={props.menuToggle} toggleIcon={props.toggleState}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>  
    </header>
);

export default toolbar;