import React from "react";
import { useEffect, useState } from "react";
import { get } from "../../utilities";
import SingleStory from "./Singlestory";
import { NewStory } from "./NewPostInput";

import "./Timeline.css"
import '../../utilities.css'

const Timeline =(props) => {
    const [stories, setStories] = useState([]);

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


  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <SingleStory
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
    {storiesList}
    <NewStory addNewStory={addNewStory}/>
    </div>)
  ;
};

export default Timeline