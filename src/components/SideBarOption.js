import React from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

import styled from "styled-components";

const SideBarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();
  const addChannel = async () => {
    const roomName = prompt("Enter room name :");
    if (roomName) {
      try {
        const docRef = await addDoc(collection(db, "rooms"), {
          name: roomName,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const selectChannel = () => {
    if (id) {
      console.log(id)
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SideBarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: "10px" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SideBarOptionChannel>
          <span>#</span> {title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionContainer>
  );
};

export default SideBarOption;

const SideBarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
    cursor: pointer;
  }
  > h3 {
    font-weight: 500;
  }
`;
const SideBarOptionChannel = styled.div`
  font-size: 12px;
  > span {
    display: inline-block;
    padding: 15px;
  }
`;
