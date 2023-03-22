import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { useParams } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom'

import Default from '../../public/Default.png'

import "../../utilities.css"
import "./Profile.css"


const Profile = (props) => {
    const [viewinguserId,setViewingUuserId] = useState(useParams().viewing_userId)
    const [viewinguser,setViewingUser] = useState({})
    useEffect(() => {
        document.title='个人页面';
        console.log(`viewing ${viewinguserId}`)
        get("/api/profile",{userId:viewinguserId}).then((userObj)=>{setViewingUser(userObj)})
    },[])

    const navigate = useNavigate();

    //startChat将正在被显示的用户添加到聊天列表第一
    const startChat = () => {
        return post("/api/startChat", {_id:viewinguserId})
        }

    const handleChat = () => {
      startChat().then(()=>{navigate("/message")})
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
              <h4 className="Profile-subTitle">{viewinguser.user_name}</h4>
              <div id="profile-description">
                {viewinguser.description}
              </div>
              {props.userId?
              <button onClick={handleChat}>私信</button>:
              null}
              <Link to="/" onClick={props.handleLogout}>登出</Link>
            </div>
          </div>
        </>
      );
}

export default Profile