import React from "react";
import Timeline from './Timeline.js';
import { useEffect } from "react";



import "../../utilities.css";
import "./Skeleton.css";



const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <body>
      <Timeline is='首页' />
    </body>
  );
};

export default Skeleton;
