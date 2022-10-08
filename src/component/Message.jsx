import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const Chatbox = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    &.owner {
      align-items: flex-end;
    }
  `;
  const Chats = styled.div`
    max-width: 60%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    &.owner {
      align-items: flex-end;
    }
    &.owner p {
      border-radius: 10px 0px 10px 10px;
      background-color: #9feebf86;
    }
  `;
  const Image = styled.img`
    width: 27rem;
    height: 28rem;
    max-height: 30rem;
    margin-bottom: 0.5rem;
  `;
  const Para = styled.p`
    font-family: "Roboto";
    font-size: 1.5rem;
    font-weight: 400;
    color: black;
    border-radius: 0 10px 10px 10px;
    padding: 1rem;
    max-width: 100%;
    background-color: white;
  `;

  return (
    <Chatbox
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <Chats
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        {message.img && <Image src={message.img} alt="" />}
        {message.text ? <Para>{message.text}</Para>:<Para style={{display:"none"}}></Para>}
      </Chats>
    </Chatbox>
  );
};

export default Message;
