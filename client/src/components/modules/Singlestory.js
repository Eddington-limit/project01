import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Singlestory.css'
import '../../utilities.css'
import { get } from "../../utilities";
import SingleComment from "./SingleComment";

const SingleStory = (props) => {
  const [comments, setComments] = useState([]);
  const [showingComment, setShowingComment] = useState(false);

  useEffect(()=>{
    get('/api/comments',{parent:props._id}).then((commentObjs)=>{
      setComments(commentObjs)
    })
  }
  ,[])

  const showComment = () => {
    setShowingComment(!showingComment)
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  let commentsList = null;
  const hasComments = comments.length !== 0;
  if (hasComments) {
    commentsList = comments.map((commentObj) => (
      <SingleComment
        userId={props.userId}
        creator_id={commentObj.creator_id}
        creator_name={commentObj.creator_name}
        content={commentObj.content}
        _id={commentObj._id}
        key={commentObj._id}
      />
    ));
  } else {
    commentsList = <div>没有内容</div>;}

    return (
      <div className="story">
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
          {props.creator_name}
        </Link>
        <p className="storyContent">{props.content}</p>
        <span className="comment-and-like-button">
          <button className="item" onClick={showComment}>评论:{comments.length}</button>
          <div className="item">点赞：{props.liked_by.includes(props.userId)?`liked ${props.num_of_likes}`:props.num_of_likes}</div>
        </span>
        {showingComment?commentsList:null}
      </div>
    );
  };
  
export default SingleStory;