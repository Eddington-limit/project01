import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./DirectMessages.css";


/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const DirectMessages = (props) => {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   * @property {String[]} description
   * @property {UserObject[]} chatted_with
   */
  /**
   * @typedef MessageObject
   * @property {UserObject} sender
   * @property {string} content
   */
  /**
   * @typedef ChatData
   * @property {MessageObject[]} messages
   * @property {UserObject} recipient
   */

  //dm not working

  const [activeUsers, setActiveUsers] = useState([]);

  const [activeChat, setActiveChat] = useState({
    recipient: {},
    messages: [],
  });

  const loadMessageHistory = (chatting_with) => {
    get("/api/chat", { recipient_id: chatting_with._id }).then((messages) => {
      setActiveChat({
        recipient: chatting_with,
        messages: messages,
      });
    });
  };

  const addMessages = (data) => {
    setActiveChat(prevActiveChat => ({
      recipient: prevActiveChat.recipient,
      messages: prevActiveChat.messages.concat(data),
    }));
  };

  useEffect(() => {
    document.title = "私信";
  }, []);


  useEffect(() => {if (props.userId) {
    get("/api/activeUsers").then((data) => {
      // 如果用户已登录，就加载聊天列表聊天历史
      // 聊天历史默认为与最近一个聊天对象的聊天历史
      setActiveUsers(data);})
      .then(()=>{if (activeUsers.length>=1) {loadMessageHistory(activeUsers[0])}})}
    },[])
    


  useEffect(() => {
    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, []);





  const setActiveUser = (user) => {
    loadMessageHistory(user)
  };

  if (!props.userId) {
    return <div className="dm-page-container">请登录</div>;
  }
  return (
      <div className="u-flex u-relative dm-page-container">
        <div className="userList">
          <ChatList
            setActiveUser={setActiveUser}
            userId={props.userId}
            users={activeUsers}
            active={activeChat.recipient}
          />
        </div>
        <div className="chatContainer u-relative">
          <Chat data={activeChat}/>
        </div>
      </div>
  );
}

export default DirectMessages;