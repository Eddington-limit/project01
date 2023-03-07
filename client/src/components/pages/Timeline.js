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
  const addNewStory = (storyObj) => {
    setStories([storyObj].concat(stories));
  };

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <SingleStory
        
      />
    ));
  } else {
    storiesList = <div>没有内容</div>;
  }
  return (
    <>
      {props.userId && <NewStory addNewStory={addNewStory} />}
      {storiesList}
    </>
  );
};

export default Timeline