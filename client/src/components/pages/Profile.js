import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
//

const Profile = (props) => {//how to get prop in the path of router?
    const [userId,setUserId] = useState(useParams().userId)
    const [profile,setProfile] = useState({})
    useEffect(() => {
        document.title='个人页面';
        get("/api/profile",{userId:userId}).then((profileObj)=>{setProfile(profileObj)})
    },[]).then(()=>{console.log(profile.creator_name)})
    //test if router and api are working,something is wrong
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
          <h1 className="Profile-name u-textCenter"></h1>
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