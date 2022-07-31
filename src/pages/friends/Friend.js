import { useEffect, useState } from "react"
import { fetchUrl } from "../../components/GlobalVariables";
import "./Friend.css"

function Friend({friend_id, friendListPackage}) {
  const [friend, setFriend] = useState({})
  const {currentUser, setChatId, setShowFriends, setShowChats, setShowMessages} = friendListPackage

  useEffect(() => {
    fetch(`${fetchUrl}/users/${friend_id}`)
    .then(res => res.json())
    .then(setFriend)

    // keep checking friends online status
    const intervalId = setInterval(() => {
      fetch(`${fetchUrl}/users/${friend_id}`)
      .then(res => res.json())
      .then(setFriend)
    }, 5000)

    return (() => {
      clearInterval(intervalId)
    })
  }, [])

  let Img, online

  if (friend.id) {
    Img = friend.profile_img ? friend.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
    online = friend.is_login ? {backgroundColor: "green"} : {backgroundColor: "red"}
  }

  function findMessages() {
    fetch(`${fetchUrl}/find_chats?user_id=${currentUser.id}&friend_id=${friend.id}`)
    .then(res => res.json())
    .then(data => {
      setChatId(data.id)
      setShowFriends(false)
      setShowChats(false)
      setShowMessages(true)
    }) 
  }

  return (
    <>
      {
        friend.id ? (
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
          </div>
        ) : (
          null
        )
      }
    </>
  );
}

export default Friend;
