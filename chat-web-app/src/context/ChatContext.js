import React, { useContext, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";

import { db } from "../firebase";

const ChatContext = React.createContext();

export function useChat() {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
  const messageCollectionRef = collection(db, "Chats");
  const [activeChatProfile, setActiveChatProfile] = useState(null);

  // getUser fetches user profile data given userEmail as parameters
  // returns Error if user Profile not found
  async function getUser(userEmail) {
    try {
      const userProfileData = await getDoc(doc(db, "Users", userEmail));

      if (!userProfileData.exists())
        return new Error("User Profile doesn't exist");

      return userProfileData.data();
    } catch {
      return new Error("Unable to fetch User profile");
    }
  }

  const value = {
    activeChatProfile,
    messageCollectionRef,
    setActiveChatProfile,
    getUser,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
