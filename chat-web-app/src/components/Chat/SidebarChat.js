import React from "react";
import Avatar from "@mui/material/Avatar";
import "./SidebarChat.css";

import { useChat } from "../../context/ChatContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function SidebarChat({ profile, userEmail, addNewChat, notify }) {
  const { setActiveChatProfile, getUser } = useChat();

  function createChat() {
    let chatEmail = prompt("please enter mail for chat");

    if (chatEmail) {
      chatEmail = chatEmail.trim();
      if (chatEmail !== userEmail) {
        getUser(chatEmail)
          .then((val) => setActiveChatProfile(val))
          .catch((err) => alert(err.message));
      } else alert("Please do not enter your Email!");
    }
  }

  async function setActiveChatProfileHandler() {
    setActiveChatProfile(profile);
    await updateDoc(doc(db, "Notification", userEmail), {
      to: arrayRemove(profile.email),
    });
  }

  return !addNewChat ? (
    <div className="sidebarChat" onClick={setActiveChatProfileHandler}>
      <Avatar
        src={`https://avatars.dicebear.com/api/human/${profile.uid}.svg?mood[]=happy`}
      />
      <div className="sidebarChat__info">
        <h2 className="sidebarChat__profile">{profile.username} </h2>
      </div>
      <div className={`notification__bar ${notify && "active"}`}></div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
