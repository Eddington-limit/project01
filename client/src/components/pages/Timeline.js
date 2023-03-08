import React from "react";
import { useEffect, useState } from "react";
import { get } from "../../utilities";
import SingleStory from "../modules/Singlestory";

const Timeline =(props) => {
    const [stories, setStories] = useState([]);

  useEffect(() => {
    document.title = props.is;
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, []);


  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <SingleStory
        creator_id={storyObj.creator_id}
        creator_name={storyObj.ceator_name}
        content={storyObj.content}
        _id={storyObj._id}
        num_of_likes={storyObj.num_of_likes}
        num_of_comments={storyObj.num_of_comments}
      />
    ));
  } else {
    storiesList = <div>没有内容</div>;
  }
  return storiesList
  ;
};

export default Timeline