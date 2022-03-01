import React, { useEffect, useState } from "react";
import { Card, Alert } from "@mui/material";

import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const { getUser } = useChat();

  useEffect(() => {
    getUser(currentUser.email)
      .then((val) => {
        setUserProfile(val);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="dashboard">
      {loading ? (
        <h1>Loading...</h1>
      ) : !error ? (
        <div className="dashboard__body">
          <Sidebar userProfile={userProfile} />
          <Chat userProfile={userProfile} />
        </div>
      ) : (
        <Card>
          <Alert severity="error">{error}</Alert>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
