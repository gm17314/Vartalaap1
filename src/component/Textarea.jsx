import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { Flex } from "./Common";
import { FaPaperclip, FaImage } from 'react-icons/fa';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Textarea = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    console.log('clicked ho gya')
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };


  const Send = styled(Flex)`
    width: 30%;
    height: 100%;
    color: rgba(49, 53, 51, 0.712);
    cursor: pointer;
    font-size:3rem;
    justify-content: space-evenly;
    padding-right:1rem;
    `
  const Button = styled.button`
    height: 80%;
    width: 30%;
    font-size: 2rem;
    background-color: #063858;
    color:white;
    font-weight:500;
    border:inherit;
    margin-left: 1rem;
    cursor: pointer;
    border-radius:4px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    `

  return (
    <div className="Textarea">
      <textarea id="textarea" className="Input" type='text' placeholder='Your message...' onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Send>
        <span className="attach"><FaPaperclip /></span>
        <input type="file" id="attach-image" style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="attach-image" style={{ fontSize: "3.5rem", cursor: "pointer" }} ><FaImage /></label>
        <Button onClick={handleSend}>Send</Button>
      </Send>
    </div>
  )
}

export default Textarea
