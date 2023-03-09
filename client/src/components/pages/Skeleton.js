import React from "react";
import Timeline from '../modules/Timeline.js';
import { useEffect } from "react";



import "../../utilities.css";
import "./Skeleton.css";



const Skeleton = (props) => {
  return (
      <Timeline is='首页' userId={props.userId}/>
  );
};

export default Skeleton;
