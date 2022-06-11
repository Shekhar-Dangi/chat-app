import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import CommentIcon from "@mui/icons-material/Comment";
import MailLockIcon from "@mui/icons-material/MailLock";
import SideBarOption from "./SideBarOption";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AddIcon from "@mui/icons-material/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseConfig";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const SideBar = () => {
  const [user] = useAuthState(auth);
  const [channels, loading, error] = useCollection(collection(db, "rooms"));
  console.log(channels);
  channels?.docs.map((doc) => {
    console.log(doc.data().name);
  });
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>The Jolien</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SideBarInfo>
        <CreateIcon />
      </SideBarHeader>
      <SideBarOption Icon={CommentIcon} title="Threads" />
      <SideBarOption Icon={MailLockIcon} title="Mailers" />
      <SideBarOption Icon={EmojiPeopleIcon} title="Sharing" />
      <SideBarOption title="Fodege" />
      <hr />
      <SideBarOption Icon={AddIcon} addChannelOption title="Create Channel" />
      <hr />
      {channels?.docs.map((doc) => (
        <SideBarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #42974b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;
const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #42974b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #42974b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SideBarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    color: green;
    margin-top: 1px;
    margin-right: 2px;
  }
`;
