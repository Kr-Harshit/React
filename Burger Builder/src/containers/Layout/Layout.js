import React, {Component} from 'react';

import Aux from "../../hoc/Auxillary/Auxillary"
import classes from "./Layout.module.css";
import Toolbar from  "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends Component{
    state={
        showSideDrawer: false
    }

    SideDrawerOpenhandler = () =>{
        this.setState({showSideDrawer: true});
    }

    SideDrawerClosedhandler = () =>{
        this.setState({showSideDrawer:false});
    }

    render(){
        return (
        <Aux>
            <Toolbar 
                menuToggle={this.SideDrawerOpenhandler}
                toggelState={this.state.showSideDrawer}/>
            <SideDrawer 
                closed={this.SideDrawerClosedhandler} 
                open = {this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
       );
    }
}

export default Layout;