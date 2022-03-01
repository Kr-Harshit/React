import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Alert,
  Button,
  TextField,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import "./Auth.css";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [userInput, setUserInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

  const { signup, loading, setLoading, error, setError } = useAuth();
  const mounted = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordInput !== passwordConfirmInput) {
      return setError("Passwords do not match");
    }

    signup(userInput, emailInput, passwordInput)
      .then((val) => {
        navigate("/dashboard");
      })
      .catch((err) => console.log(err.message));

    if (mounted.current) setLoading(false);
  }

  return (
    <div className="auth">
      <div className="auth__body">
        <Card>
          <CardContent>
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            {error && <Alert severity="error">{error}</Alert>}
          </CardContent>
          <CardActions>
            <form onSubmit={handleSubmit} className="auth__form">
              <div className="auth__inputWrapper">
                <TextField
                  label="Username"
                  variant="outlined"
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  sx={{ minWidth: "30vw" }}
                  autoFocus
                  required
                />
              </div>
              <div className="auth__inputWrapper">
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  sx={{ minWidth: "30vw" }}
                  required
                />
              </div>
              <div className="auth__inputWrapper">
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  sx={{ minWidth: "30vw" }}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>
              <div className="auth__inputWrapper">
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  sx={{ minWidth: "30vw" }}
                  value={passwordConfirmInput}
                  onChange={(e) => setPasswordConfirmInput(e.target.value)}
                  required
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                Sign UP
              </Button>
            </form>
          </CardActions>
        </Card>
        <div className="auth__footer">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
