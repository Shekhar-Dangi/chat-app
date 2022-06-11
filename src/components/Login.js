import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => alert(err));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/user_photos/001/984/704/datas/profile.png" />
        <h1>Sign In to theJolien</h1>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    height: 80px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
