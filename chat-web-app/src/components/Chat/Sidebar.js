import React, { useEffect, useState } from "react";

import { IconButton, Menu, MenuItem, Avatar, Alert } from "@mui/material";
import {
  SearchOutlined,
  Chat,
  MoreVert,
  DonutLarge,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";

import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { db } from "../../firebase";

function Sidebar({ userProfile }) {
  const [sidebarHeaderAnchor, setSidebarHeaderAnchor] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [notification, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const { getUser } = useChat();

  const open = Boolean(sidebarHeaderAnchor);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setSidebarHeaderAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setSidebarHeaderAnchor(null);
  };

  function handleLogout() {
    logout().then(navigate("/login")).catch(console.log);
  }

  useEffect(() => {
    setError("");

    const unsub1 = onSnapshot(
      doc(db, "ChatHistory", userProfile.email),
      (snapshot) => {
        if (snapshot.data()) {
          setChatRooms([]);
          snapshot.data()["to"].forEach((chatProfile) => {
            getUser(chatProfile).then((chatProfileData) => {
              setChatRooms((val) => [...val, chatProfileData]);
            });
          });
        }

        setLoading(false);
      },
      (err) => {
        setError("Unable to fetch chat History");
      }
    );

    const unsub2 = onSnapshot(
      doc(db, "Notification", userProfile.email),
      (snapshot) => {
        if (snapshot.data()) {
          setNotifications(snapshot.data()["to"]);
        }
      },
      (err) => {
        setError("Unable to fetch notification status");
      }
    );

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${userProfile.uid}.svg?mood[]=happy`}
        />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge style={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton>
            <Chat style={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton
            aria-controls={open ? "sidebar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert style={{ fontSize: "20px" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={sidebarHeaderAnchor}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "sidebar-menu" }}
          >
            <MenuItem>
              <strong>{userProfile.username}</strong>
            </MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chat">
        {loading ? (
          <h1>Loading....</h1>
        ) : (
          <>
            {" "}
            <SidebarChat addNewChat />
            {!error ? (
              chatRooms.map((chat, id) => {
                return (
                  <SidebarChat
                    key={id}
                    profile={chat}
                    userEmail={userProfile.email}
                    notify={notification.includes(chat.email)}
                  />
                );
              })
            ) : (
              <Alert severity="error">{error}</Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
