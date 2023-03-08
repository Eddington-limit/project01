import React from "react";
import Timeline from './Timeline.js';
import { useEffect } from "react";
import SingleStory from "../modules/Singlestory.js";



import "../../utilities.css";
import "./Skeleton.css";



const Skeleton = () => {
  return (
    <div>
      <SingleStory 
        creator_name='test user'
        creator_id={0}
        num_of_likes={99}
        num_of_comments={2}
        content='this is test story' />
    </div>
  );
};

export default Skeleton;
