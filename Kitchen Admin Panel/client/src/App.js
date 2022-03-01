import React from "react";
import "./App.css";
import Admin from "./components/admin/Admin";
import Login from "./components/Login/Login";
import NoMatch from "./components/nomatch";
import { Switch, BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/admin" component={Admin} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
