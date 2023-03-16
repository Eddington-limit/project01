import React, { useState } from 'react';

import "./LoginForm.css"

function LoginForm(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [is, setIs] = useState('')


    const toggleLoginForm = () => {
      setIsVisible(!isVisible);
      setIs('登录');
    }

    const toggleRegisterForm = () => {
      setIsVisible(!isVisible);
      setIs('注册');
  }
    const closeDropDown = () =>{
      setIsVisible(!isVisible);
    }

  return (
    <div className='login-form'>{!isVisible?
      <div>
        <button onClick={toggleLoginForm}>登录</button>
        <button onClick={toggleRegisterForm}>注册</button>
      </div>:
      <div>
        <button onClick={closeDropDown}>x</button>
        <input type="text" placeholder="用户名" onChange={props.handleUsernameChange} />
        <input type="password" placeholder="密码" onChange={props.handlePasswordChange} />
        <button onClick={is=='登录'?props.handleLogin:props.handleRegister}>{is}</button>
      </div>}
    </div>
  );
}

export default LoginForm;