import React, { useState } from "react";
import { InsertEmoticon, Mic, Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../../firebase";
import { useChat } from "../../context/ChatContext";

const ChatInput = ({ userEmail, chatEmail, disabled }) => {
  const [input, setInput] = useState("");
  const { messageCollectionRef } = useChat();

  function sendMessageHandler(e) {
    e.preventDefault();

    const messageData = {
      uid: `${userEmail}+${chatEmail}`,
      from: userEmail,
      to: chatEmail,
      message: input,
      timestamp: serverTimestamp(),
    };

    addDoc(messageCollectionRef, messageData).then(() => {
      setDoc(
        doc(db, "ChatHistory", userEmail),
        { to: arrayUnion(chatEmail) },
        { merge: true }
      );
      setDoc(
        doc(db, "ChatHistory", chatEmail),
        { to: arrayUnion(userEmail) },
        { merge: true }
      );
      setDoc(
        doc(db, "Notification", chatEmail),
        { to: arrayUnion(userEmail) },
        { merge: true }
      );
    });

    setInput("");
  }

  return (
    <div className="chat__footer">
      <IconButton>
        <InsertEmoticon style={{ fontSize: "20px" }} />
      </IconButton>
      <form onSubmit={sendMessageHandler}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          disabled={disabled}
        />
        <IconButton onClick={sendMessageHandler}>
          <Send style={{ fontSize: "20px" }} />
        </IconButton>
      </form>
      <IconButton>
        <Mic style={{ fontSize: "20px" }} />
      </IconButton>
    </div>
  );
};

export default ChatInput;
