import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom'

import Default from '../../public/Default.png'

import "../../utilities.css"
import "./Profile.css"
//{user_name:String,description:String,profile_pic:image(?)}

const Profile = (props) => {//how to get prop in the path of router?
    const [viewinguserId,setViewingUuserId] = useState(useParams().viewing_userId)
    const [profile,setProfile] = useState({})
    useEffect(() => {
        document.title='个人页面';
        get("/api/profile",{userId:userId}).then((profileObj)=>{setProfile(profileObj)})
    },[])
    //check session?
    //cal whoami to check if logged in, then display chat button
    //implement startChat to chat (create a new api?)
const startChat = () => {
    
}
    return (
        <>
          <div
            className="Profile-avatarContainer"
            onClick={() => {
            ;
            }}
          >
            <div className="Profile-avatar" style={{backgroundImage: `url(${Default})`}}></div>
          </div>
          <h1 className="Profile-name u-textCenter"></h1>
          <hr className="Profile-linejj" />
          <div className="u-flex">
            <div className="Profile-subContainer u-textCenter">
              <h4 className="Profile-subTitle">{profile.user_name}</h4>
              <div id="profile-description">
                {profile.description}
              </div>
              {userId?
              <Link to="/message" onClick={}></Link>:
              null}
              <Link to="/" onClick={props.handleLogout}>登出</Link>
            </div>
          </div>
        </>
      );
}

export default Profile