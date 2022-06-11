import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import Login from "./components/Login";

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (<Login />) : (<>
          <Header />
          <AppBody >
            <SideBar />
            <Routes>
              <Route exact path="/" element={<Chat />} />
            </Routes>
          </AppBody></>
        )}

      </BrowserRouter>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
