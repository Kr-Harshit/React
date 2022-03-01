import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Alert,
  Button,
  TextField,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const { login, loading, setLoading, error } = useAuth();
  const navigate = useNavigate();

  const mounted = useRef();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    login(emailInput, passwordInput)
      .then(() => navigate("/dashboard"))
      .catch((err) => console.log(err));

    if (mounted.current) setLoading(false);
  }

  return (
    <div className="auth">
      <div className="auth__body">
        <Card>
          <CardContent>
            <h2 style={{ textAlign: "center" }}>Log In</h2>
            {error && <Alert severity="error">{error}</Alert>}
          </CardContent>
          <CardActions>
            <div>
              <form onSubmit={handleSubmit} className="auth__form">
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

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </Button>
              </form>
              <div className="forgot_password">
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  Forgot password
                </Link>
              </div>
            </div>
          </CardActions>
        </Card>
        <div className="auth__footer">
          Need an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
