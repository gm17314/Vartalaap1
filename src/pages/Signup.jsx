import React, { useState } from "react";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";
import { Flex, H2, font1 } from "../component/Common";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const Signup = styled(Flex)`
    height: 100vh;
  `;
  const Signupbox = styled(Flex)`
    flex-direction: column;
    justify-content: flex-start;
    width: 40%;
    /* height: 78%; */
    padding-bottom: 1rem;
    backdrop-filter: blur(12px) saturate(185%);
    -webkit-backdrop-filter: blur(12px) saturate(185%);
    background-color: rgba(255, 255, 255, 0.28);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.28);
  `;
  const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  `;
  const Input = styled.input`
    border: 0;
    font-family: monospace;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-radius: 1rem;
    width: 80%;
    height: 4rem;
    font-size: 2.2rem;
    color: #0a0000;
    background-color: rgba(250, 243, 243, 0.28);
    padding-left: 1rem;
    margin: 1.3rem;
    &:focus {
      outline: none;
    }
  `;
  const Button = styled.button`
    color: #241919;
    background-color: #c4c0c046;
    border-radius: 1rem;
    border: 0;
    width: 60%;
    height: 4.5rem;
    margin: 1rem;
    font-size: 3rem;
    font-weight: 500;
    font-variant: small-caps;
    cursor: pointer;
    &:focus {
      color: rgb(2, 87, 61);
    }
  `;
  const Label = styled.label`
    width: 78%;
    display: flex;
    align-items: center;
    font-size: 5rem;
    margin: 0.8rem;
    cursor: pointer;
    span {
      font-size: 2.3rem;
      margin: 0 1rem;
      font-family: ${font1};
    }
  `;
  const Anchor = styled.p`
    font-size: 2rem;
    color: #c00404;
    cursor: pointer;
  `;
  return (
    <Signup>
      <Signupbox>
        <H2>
          Welcome To Vartalaap Chats
          <br />
          🙏🙏🙏
        </H2>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username (Max 12 characters)"
            type="text"
            required
            maxLength="12"
          />
          <Input placeholder="email" type="email" required />
          <Input placeholder="password" type="password" required />
          <Input style={{ display: "none" }} type="file" id="avatar" />
          <Label htmlFor="avatar">
            <FaImage />
            <span>Choose Your Avatar/Image</span>
          </Label>
          <Button className="Signup" disabled={loading}>SignUp</Button>
          {loading && <span  style={{fontSize:'1.4rem'}}>Uploading please wait...</span>}
          <Anchor>
            Already an account,
            <Link style={{ color: "red", textDecoration: "none" }} to="/login">
              Click here
            </Link>
          </Anchor>
          {error && <span style={{fontSize:'1.3rem'}}>Something went wrong</span>}
        </Form>
      </Signupbox>
    </Signup>
  );
};

export default Signup;
