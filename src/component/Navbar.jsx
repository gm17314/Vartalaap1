import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { font3, font1, Flex } from "./Common";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    height: 12%;
    background-color: #063858;
  `;
  const Logo = styled.h4`
    width: 25%;
    color: rgba(251, 252, 253, 0.829);
    font-family: ${font3};
    font-size: 2rem;
    text-align: center;
  `;
  const Profile = styled(Flex)`
    justify-content: flex-end;
    width: 60%;
  `;
  const Image = styled.img`
    border-radius: 50%;
  `;
  const Button = styled.button`
    width: 32%;
    height: 2.5rem;
    font-size: 1.2rem;
    font-family: ${font1};
    border-radius: 0.2rem;
    margin: .8rem;
    padding:.3rem;
    border: none;
    color: rgba(251, 252, 253, 0.829);
    background-color: #f95757;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color:  f95757;
    }
    &:active {
      color: black;
    }
  `;
  const User = styled.span`
    color: white;
    font-size: 1.8rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
    margin: .4rem;
  
  `;
  return (
    <Navbar>
      <Logo>Vartalaap</Logo>
      <Profile>
        <User>{currentUser.displayName}</User>
        <Image width="30%" height="50%" src={currentUser.photoURL} alt="" />
        <Button onClick={() => signOut(auth)}>logout</Button>
      </Profile>
    </Navbar>
  );
};

export default Navbar;
