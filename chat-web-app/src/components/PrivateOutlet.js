import React from "react";
import { Navigate } from "react-router-dom";

import Dashboard from "./Chat/Dashboard";
import { useAuth } from "../context/AuthContext";
import { ChatProvider } from "../context/ChatContext";

const PrivateOutlet = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <ChatProvider>
      <Dashboard />
    </ChatProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutlet;
