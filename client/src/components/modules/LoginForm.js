import React, { useState } from 'react';
import { post } from "../../utilities";

import "./LoginForm.css"

function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);
    const {username, setUsername} = useState('username');
    const {password, setPassword} = useState('password');

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value)
    }

    const loginRequest = () => {
        post("api/login",{username:username,password:password})
    }

  return (
    <div>{!isVisible?
      <button onClick={toggleVisibility}>Login</button>:
        <button onClick={toggleVisibility}>x</button>}
      {isVisible && (
        <div>
          <input type="text" placeholder="Username" onChange={handleUsernameChange} />
          <input classname="dropdown" type="password" placeholder="Password" onChange={handlePasswordChange} />
          <button onClick={loginRequest}>Login</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;