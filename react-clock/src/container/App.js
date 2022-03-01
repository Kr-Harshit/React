import React, {Component} from 'react';
import './App.css';
import Clock from '../Clock/Clock'

class App extends Component
{

  state = {
    hour: new Date().getHours(),
    minute:new Date().getMinutes(),
    second:new Date().getSeconds()
  };

  updateTimeHandler = ()=>{
    let currTime = new Date();
    this.setState({
      hour: currTime.getHours(),
      minute: currTime.getMinutes(),
      second :currTime.getSeconds()
    });
  }

  render(){
    setInterval(this.updateTimeHandler, 1000);
    
    return (
      <div className="App">
        <h1>{this.state.hour}:{ this.state.minute}: {this.state.second}</h1>
        <Clock 
          hours ={this.state.hour}
          minutes = {this.state.minute}
          seconds = {this.state.second}/>
      </div>
    );
  }
}

export default App;
