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

    const loginRequest = () => {
        post("api/login",{})
    }

  return (
    <div>{!isVisible?
      <button onClick={toggleVisibility}>Login</button>:
        <button onClick={toggleVisibility}>x</button>}
      {isVisible && (
        <div>
          <input type="text" placeholder="Username" onChange={handleChange} />
          <input classname="dropdown" type="password" placeholder="Password" />
          <button onClick={loginRequest}>Login</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;