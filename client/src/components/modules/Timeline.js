import React from "react";
import { useEffect, useState, useRef } from "react";
import { get } from "../../utilities";
import SingleStory from "./Singlestory";
import { NewStory } from "./NewPostInput";

import "./Timeline.css"
import '../../utilities.css'

const Timeline =(props) => {
    const [stories, setStories] = useState([]);
    const topRef = useRef(null)

  useEffect(() => {
    document.title = props.is;
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, []);


  const addNewStory = (storyObj) => {
    setStories([storyObj].concat(stories));
  };

  const handleToTop = () => {
    topRef.current.scrollIntoView({behavior: "smooth"})
  }


  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj, i) => (
      <SingleStory
        ref={i===0?topRef:null}
        userId={props.userId}
        creator_id={storyObj.creator_id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
        _id={storyObj._id}
        num_of_likes={storyObj.num_of_likes}
        num_of_comments={storyObj.num_of_comments}
        key={storyObj._id}
        liked_by={storyObj.liked_by}
      />
    ));
  } else {
    storiesList = <div>没有内容</div>;
  }
  return (<div className="timeline">
    <div className="timeline-content">{storiesList}</div>
    <button onClick={handleToTop}>
      回到顶部
    </button>
    <form className="new-story-input">
      <NewStory addNewStory={addNewStory}/>
    </form>
    </div>)
  ;
};

export default Timeline