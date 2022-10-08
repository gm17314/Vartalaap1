import React, { useState } from "react";
import styled from "styled-components";
import { Flex, H2 } from "../component/Common";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  const Login = styled(Flex)`
    height: 100vh;
  `;
  const Loginbox = styled(Flex)`
    flex-direction: column;
    justify-content: flex-start;
    width: 40%;
    /* height: 71%; */
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
    margin: 1.5rem;
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
    margin: 1.3rem;
    font-size: 3rem;
    font-weight: 500;
    font-variant: small-caps;
    cursor: pointer;
    &:focus {
      color: rgb(2, 87, 61);
    }
  `;
  const Anchor = styled.a`
    font-size: 2rem;
    color: #c00404;
    cursor: pointer;
    text-decoration: none;
  `;

  return (
    <Login>
      <Loginbox>
        <H2>
          Welcome To Vartalaap
          <br />
          🙏🙏🙏
        </H2>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="email" type="email" required />
          <Input placeholder="password" type="password" required />
          <Button className="Login" >
            Login
          </Button>
          <Anchor>
            Not Registered,
            <Link style={{ color: "red", textDecoration: "none" }} to="/signup">
              Click here
            </Link>
          </Anchor>
          {error && (
            <span style={{ fontSize: "1.4rem" }}>Something went wrong</span>
          )}
        </Form>
      </Loginbox>
    </Login>
  );
};

export default Login;
