import React from "react";
import { useEffect, useState } from "react";
import { get } from "../../utilities";

const Timeline =(props) => {
    const [stories, setStories] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = props.is;
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, []);
}

export default Timeline