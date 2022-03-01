import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Alert,
  Button,
  TextField,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const { resetPassword, loading, setLoading, error, message } = useAuth();

  const mounted = useRef();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    resetPassword(emailInput)
      .then((val) => {
        console.log(val);
      })
      .catch((err) => console.log(err));

    if (mounted.current) setLoading(false);
  }

  return (
    <div className="auth">
      <div className="auth__body">
        <Card>
          <CardContent>
            <h2 style={{ textAlign: "center" }}>Reset Password</h2>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="info">{message}</Alert>}
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

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Reset Password
                </Button>
              </form>
              <div className="forgot_password">
                <Link to="/Login" style={{ textDecoration: "none" }}>
                  Log In
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

export default ForgotPassword;
