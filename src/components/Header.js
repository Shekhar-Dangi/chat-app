import styled from "styled-components";
import React from "react";
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  console.log("user is ", user);
  return (
    <HeaderContainer>

      {/* Header left */}
      <HeaderLeft>
        <Avatar src={user?.photoURL} alt="User profile" onClick={() => { signOut(auth) }} style={{ cursor: "pointer" }} />
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search for jolien" type="text" />
      </HeaderSearch>

      {/* Header right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>

    </HeaderContainer>
  );
};

export default Header;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    min-width: 30vw;
    text-align: center;
    color: white;
    outline: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 30px; 
  }
 
`;

const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;
  > .MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 30px; 
  }
`;