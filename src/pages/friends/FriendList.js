import { useEffect, useState } from "react";
import { fetchUrl } from "../../components/GlobalVariables";
import Friend from "./Friend";
import "./FriendList.css"

function FriendList({friendListPackage}) {
  const {currentUser, setShowFriends} = friendListPackage
  const [userFriends, setUserFriends] = useState([])
  const [inviteMode, setInviteMode] = useState(false)

  useEffect(() => {
    fetch(`${fetchUrl}/friends/${currentUser.id}`)
    .then(res => res.json())
    .then(setUserFriends)

    // keep checking friends online status
    const intervalId = setInterval(() => {
      fetch(`${fetchUrl}/friends/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserFriends)
    }, 5000)

    return (() => {
      clearInterval(intervalId)
    })
  }, [])

  const showFriends = userFriends.map(friend => <Friend key={friend.id} friend={friend} friendListPackage={friendListPackage} />)

  return (
    <div id="friend-list">
      <div className="list-header">
        <p>{currentUser.username.slice(0, 1).toUpperCase()}{currentUser.username.slice(1)}'s friend list</p>
        <div className="exit-button" onClick={() => setShowFriends(false)}>
          <p>x</p>
        </div>
      </div>
      {showFriends}
      <div id="add-friend">
        <input type="text" placeholder="Enter user name" />
        <img id="add-friend-img" src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/000000/external-add-friend-friendship-wanicon-two-tone-wanicon.png" alt="add-friend-img"/>
      </div>
    </div>
  );
}

export default FriendList;