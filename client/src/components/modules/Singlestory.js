import React from "react";
import { Link } from "react-router-dom";

import './Singlestory.css'
import '../../utilities.css'

const SingleStory = (props) => {
    return (
      <div className="story">
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
          {props.creator_name}
        </Link>
        <p className="storyContent">{props.content}</p>
        <span>
          {props.num_of_comments}
          {props.num_of_likes}
          </span>
      </div>
    );
  };
  
export default SingleStory;