import React, { useEffect, useState, useRef } from "react";
import { IconButton, Avatar } from "@mui/material";
import { AttachFile, SearchOutlined, MoreVert } from "@mui/icons-material";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";

import { useChat } from "../../context/ChatContext";
import ChatInput from "./ChatInput";
import "./Chat.css";

function Chat({ userProfile }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { activeChatProfile, messageCollectionRef } = useChat();
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // GET All messages
  useEffect(() => {
    if (activeChatProfile) {
      setMessages([]);

      const queryUID = [
        `${userProfile.email}+${activeChatProfile.email}`,
        `${activeChatProfile.email}+${userProfile.email}`,
      ];

      const q = query(
        messageCollectionRef,
        where("uid", "in", queryUID),
        orderBy("timestamp")
      );

      const unsub = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data, sent: data.from === userProfile.email };
          })
        );
        setLoading(false);
        scrollToBottom();

        return () => {
          unsub();
        };
      });
    }
  }, [activeChatProfile]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={
            activeChatProfile &&
            `https://avatars.dicebear.com/api/human/${activeChatProfile.uid}.svg?mood[]=happy`
          }
        />
        <div className="chat__headerInfo">
          <h3>{activeChatProfile && activeChatProfile.username}</h3>
          <p>last Seen</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {activeChatProfile &&
          (loading ? (
            <h1>Loading....</h1>
          ) : (
            messages.map((msg, id) => (
              <p
                key={id}
                className={`chat__message ${!msg.sent && "chat__reciever"}`}
              >
                <span className="chat__name">
                  {msg.sent ? userProfile.username : activeChatProfile.username}
                </span>
                {msg.message}
                <span className="chat__timestamp">
                  {/* {chatTimeStamp(msg.timestamp.toDate())} */}
                </span>
              </p>
            ))
          ))}
        <div ref={chatEndRef} />
      </div>
      <ChatInput
        chatEmail={activeChatProfile && activeChatProfile.email}
        userEmail={userProfile.email}
        disabled={!activeChatProfile || loading}
      />
    </div>
  );
}

export default Chat;
