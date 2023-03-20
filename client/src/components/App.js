import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Navbar from "./modules/Navbar.js";
import DirectMessages from "./pages/DirectMessages.js";
import Profile from "./pages/Profile.js";
import LoginForm from "./modules/LoginForm.js";
import ProfileAvatar from "./modules/ProfileAvatar.js";

import "../utilities.css";
import "./App.css"

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  //用于登录的信息
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
}

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    post("api/login",{username:username,password:password}).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  }

  const handleRegister = () => {
    post("api/register",{username:username,password:password})
    .then(()=>{alert('success!')})
    .catch(() => {
      alert('注册失败')})
  }


  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };


  return (
    <span className="app-container" style={{overflowY: 'hidden'}}>
      <div className="blank-space"></div>
      <div className="content">
        <div className="navbar-container">
          <Navbar/>
          {userId?
          <ProfileAvatar userId={userId}/>:
          <LoginForm
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLogin={handleLogin}
            handleRegister={handleRegister}/>}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Skeleton
                path="/"
                userId={userId}
              />
            }
          />
          <Route path="*" element={<NotFound/>} />
          <Route path="/profile/:viewing_userId" element={<Profile userId={userId} handleLogout={handleLogout}/>} />
          <Route path="/message" element={<DirectMessages userId={userId}/>} />
        </Routes>
        <div className="u-bottom u-center">此网站仅供个人学习用，请勿发布敏感或隐私信息</div>
      </div>
      <div className="blank-space"></div>
    </span>
  );
};

export default App;
