import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useEffect } from "react";
//

const Profile = (props) => {
    //dummy data
    let userID=0;
    useEffect(() => {
        document.title='个人页面';
        //get("/api/profile").then((profileObj)=>{})
        //authentication
    },[])
    return (
        <>
          <div
            className="Profile-avatarContainer"
            onClick={() => {
              ;
            }}
          >
            <div className="Profile-avatar" />
          </div>
          <h1 className="Profile-name u-textCenter">test user</h1>
          <hr className="Profile-linejj" />
          <div className="u-flex">
            <div className="Profile-subContainer u-textCenter">
              <h4 className="Profile-subTitle">简介</h4>
              <div id="profile-description">
                简介简介简介。。。。。。。
              </div>
            </div>
          </div>
        </>
      );
}

export default Profile