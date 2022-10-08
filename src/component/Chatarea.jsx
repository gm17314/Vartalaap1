import React from "react";
import styled from 'styled-components'
import Textarea from "./Textarea";
import Head from "./Head";
import Messages from './Messages';


const Chatarea = () => {
  

   const Chatarea=styled.div`
   width: 70%;
   height: 100%;
   display: flex;flex-direction:column;
   align-items: center;
   background-color: rgba(225, 248, 225, 0.925);
   `
   
   
  return (
    <Chatarea>
      <Head/>
      <Messages/>
      <Textarea/>
    </Chatarea>
  )
}

export default Chatarea
