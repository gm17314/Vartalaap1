import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components'
import {font2,Flex} from "./Common";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Friends = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

    const Friends = styled(Flex)`
    width: 100%;
    height: 75%;
    justify-content: flex-start;
    flex-direction: column;
    /* padding-left:.5rem; */
    overflow: auto;
    &::-webkit-scrollbar {
        width: 1rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius:1rem;
        background-color: rgba(63, 62, 62, 0.637);
    }
    background-color: #06395822;
    
    `
    const FriendList= styled(Flex)`
    justify-content: flex-start;
    margin-top:.5rem;
    margin-bottom:.2rem;
    padding:.8rem;
    padding-top:.2rem;
    width:100%;
    border-bottom: 1.5px solid #044b3671;
    cursor:pointer;
   
    `
    const Image = styled.img`
    width: 20%;
    height: 5rem;
    border-radius:50%;
    `
    const Name = styled.div`
    display: flex;
    justify-content:center;
    width:70%;
    height: 4.5rem;
    padding-left:.5rem;
    flex-direction: column;
    
    `
    const Username=styled.h3`
    font-size:1.5rem;
    font-family: ${font2};
    margin-bottom:.2rem;
    
    color:  #fefffedd
    `
    const Msg = styled.p`
    font-size:1.3rem;
    font-weight:500;
    color: rgba(230, 235, 230, 0.671);
    width: 90%;
    max-height: 40%;
    overflow: hidden;
    `


  return (
    <Friends>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <FriendList key={chat[0]}
        onClick={() => handleSelect(chat[1].userInfo)}>
        <Image  src={chat[1].userInfo.photoURL}></Image>
        <Name>
            <Username>{chat[1].userInfo.displayName}</Username>
            <Msg ><i>{chat[1].lastMessage?.text}</i></Msg>
        </Name>
      </FriendList>
        ))}
      </Friends>
  )
}

export default Friends

