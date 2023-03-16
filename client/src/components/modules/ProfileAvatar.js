import React from "react";
import { Link } from "react-router-dom";
import Default from '../../public/Default.png'

import './ProfileAvatar.css'
import '../../utilities.css'

const ProfileAvatar = (props) => {
    return (
        <Link  to={`/profile/${props.userId}`} 
        className="container" 
        style={{backgroundImage: `url(${Default})`}}>
          <img src={Default} className="avatar"/>
        </Link>
    );
  };

export default ProfileAvatar;