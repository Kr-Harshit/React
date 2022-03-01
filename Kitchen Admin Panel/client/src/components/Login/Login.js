import React, { useState } from "react";
import "./Login.css";
import axios from "../../axios";
import { Redirect } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [response, setResponse] = useState(false);

  console.log(response);

  const loginFormHandler = (event) => {
    event.preventDefault();
    const credentials = { userId: user, password: password };
    axios.post("/login", credentials).then((res) => {
      console.log(res);
      if (res.data === "OK") setResponse(true);
      else setResponse(false);
    });
  };

  return (
    <div className="container">
      {response ? (
        <Redirect to="/admin" />
      ) : (
        <div className="login_panel">
          <form className="login_form" onSubmit={loginFormHandler}>
            <input
              type="text"
              placeholder="userId"
              className="login_input"
              name="userId"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login_input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login_button">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
