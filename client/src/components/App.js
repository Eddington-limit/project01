import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Navbar from "./modules/Navbar.js";
import DirectMessages from "./pages/DirectMessages.js";
import Profile from "./pages/Profile.js";

import "../utilities.css";
import "./App.css"

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    setUserId(0)
    console.log(userId)
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };


  return (
    <span className="app-container">
      <div className="blank-space"></div>
      <div className="content">
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <Skeleton
                path="/"
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
              />
            }
          />
          <Route path="*" element={<NotFound/>} />
          <Route path="/profile/:userId" element={<Profile/>} />
          <Route path="/message" element={<DirectMessages/>} />
        </Routes>
        <div className="u-bottom u-center">此网站仅供个人学习用，请勿发布敏感或隐私信息</div>
      </div>
      <div className="blank-space"></div>
    </span>
  );
};

export default App;
