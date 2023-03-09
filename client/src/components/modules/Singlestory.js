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
        <span className="comment-and-like">
          <div className="item">{props.num_of_comments}</div>
          <div className="item">{props.liked_by.includes(props.userId)?`liked ${props.num_of_likes}`:props.num_of_likes}</div>
        </span>
      </div>
    );
  };
  
export default SingleStory;