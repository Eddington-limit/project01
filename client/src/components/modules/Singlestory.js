import React from "react";

const SingleStory = (props) => {
    return (
      <div className="Card-story">
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
          {props.creator_name}
        </Link>
        <p className="Card-storyContent">{props.content}</p>
      </div>
    );
  };
  
  export default SingleStory;