import { useEffect, useState } from "react";
import { fetchUrl } from "../../utilities/GlobalVariables";
import "./Friend.css"

function Friend({friend, friendListPackage}) {
  const {currentUser, unreadMessages, setChatId, setShowFriends, setShowChats, setShowMessages} = friendListPackage
  const [chat, setChat] = useState({});

  console.log(chat)
  
  useEffect(() => {
    fetch(`${fetchUrl}/find_chats?user_id=${currentUser.id}&friend_id=${friend.id}`)
    .then(res => res.json())
    .then(setChat)
  }, []);

  const Img = friend.profile_img ? friend.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
  const online = friend.is_login ? {backgroundColor: "green"} : {backgroundColor: "red"}

  function findMessages() {
    setChatId(chat.id)
    setShowFriends(false)
    setShowChats(false)
    setShowMessages(true)
  }

  const showUnreadMessages = chat.id ? unreadMessages.filter(message => message.chat_id === chat.id) : []

  return (
    <div className="friend">
      <div className="profile-img-holder">
        <img className="profile-img" src={Img} alt={friend.username} />
        <div className="online-status" style={online}></div>
      </div>
      <div className="friend-name">
        <p>{friend.username.slice(0, 1).toUpperCase()}{friend.username.slice(1)}</p>
      </div>
      <div>
        <img className="start-message" src="https://img.icons8.com/cotton/64/000000/chat.png" onClick={findMessages}/>
      </div>
      {
        showUnreadMessages.length > 0 ? (
          <div className="unread-messages">{showUnreadMessages.length > 9 ? "9+" : showUnreadMessages.length}</div>
        ) : (
          null
        )
      }
    </div>
  );
}

export default Friend;
