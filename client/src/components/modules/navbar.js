import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css"
 
const Navbar = () => {
    return <div className="container">
        <Link to="/" className="button">首页</Link>
        <Link to="/message" className="button">消息</Link>
    </div>
}

export default Navbar;