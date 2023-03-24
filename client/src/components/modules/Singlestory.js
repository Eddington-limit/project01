import React from "react";
import { Link } from "react-router-dom";

import './Singlestory.css'
import '../../utilities.css'

const SingleStory = (props) => {
  const [comments, setComments] = useState([]);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };



    return (
      <div className="story">
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
          {props.creator_name}
        </Link>
        <p className="storyContent">{props.content}</p>
        <span className="comment-and-like">
          <div className="item">评论：{props.num_of_comments}</div>
          <div className="item">点赞：{props.liked_by.includes(props.userId)?`liked ${props.num_of_likes}`:props.num_of_likes}</div>
        </span>
      </div>
    );
  };
  
export default SingleStory;