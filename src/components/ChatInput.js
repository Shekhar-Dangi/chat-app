import styled from "styled-components";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";

const ChatInput = ({ chatRef, channelName, channelId }) => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) return false;

    try {
      const collectionRef = collection(db, `rooms/${channelId}/messages`);
      const docRef = await addDoc(collectionRef, {
        message,
        user: user?.displayName,
        userImage: user?.photoURL,
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setMessage("");
      chatRef?.current?.scrollIntoView();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channelName ? channelName : ""}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none;
  }
`;
