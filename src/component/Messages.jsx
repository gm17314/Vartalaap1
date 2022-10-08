import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  const Messages = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 74.5%;
    padding: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `;
  
  return (
    <Messages>
      {messages.map((m) => (
      <Message message={m} key={m.id}/>
      ))}
    </Messages>
  );
};

export default Messages;
