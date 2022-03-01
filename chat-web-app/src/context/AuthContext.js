import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { db, auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function addUserToDatabase(username, uid, email) {
    return setDoc(doc(db, "Users", email), {
      uid: uid,
      username: username,
      email: email,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  }

  function signup(username, email, password) {
    return new Promise(async function (resolve, reject) {
      try {
        setLoading(true);
        setError("");
        setMessage("");

        let res = await createUserWithEmailAndPassword(auth, email, password);

        if (res && res.user) {
          await addUserToDatabase(username, res.user.uid, email);
        }

        setMessage("User Created");
        resolve("user created");
      } catch (err) {
        let errMessage = "Failed to create account";
        if (err instanceof FirebaseError) errMessage = err.message;
        setError(errMessage);
        reject(new Error(errMessage));
      }
    });
  }

  function login(email, password) {
    return new Promise(async function (resolve, reject) {
      try {
        setLoading(true);
        setError("");
        setMessage("");

        await signInWithEmailAndPassword(auth, email, password);
        resolve("logged In");
      } catch (err) {
        let errMessage = "invalid email or password";
        setError(errMessage);
        reject(new Error(errMessage));
      }
    });
  }

  function logout() {
    return new Promise(async function (resolve, reject) {
      try {
        await signOut(auth);
        resolve("logged out");
      } catch (error) {
        const errMessage = "Failed to log out";
        setError(errMessage);
        reject(new Error(errMessage));
      }
    });
  }

  function resetPassword(email) {
    return new Promise(async function (resolve, reject) {
      try {
        setMessage("");
        setError("");
        setLoading(true);

        await sendPasswordResetEmail(auth, email);
        setMessage("check your inbox for further instructions");
        resolve("reset link sent");
      } catch {
        const errMessage = "Failed to reset password";
        setError(errMessage);
        reject(new Error(errMessage));
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    message,
    setLoading,
    setError,
    setMessage,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
