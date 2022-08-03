import { useEffect, useState } from "react";
import { fetchUrl } from "../../utilities/GlobalVariables";
import Friend from "./Friend";
import "./FriendList.css"
import Invites from "./Invites";

function FriendList({friendListPackage}) {
  const {currentUser, setShowFriends, showAlert} = friendListPackage
  const [userFriends, setUserFriends] = useState([])
  const [friendInvites, setFriendInvites] = useState([])
  const [inviteMode, setInviteMode] = useState(false)
  const [formInput, setFormInput] = useState("")

  useEffect(() => {
    fetch(`${fetchUrl}/friends/${currentUser.id}`)
    .then(res => res.json())
    .then(setUserFriends)

    fetch(`${fetchUrl}/friends_pending/${currentUser.id}`)
    .then(res => res.json())
    .then(setFriendInvites)

    // keep checking friends online status
    const intervalId = setInterval(() => {
      fetch(`${fetchUrl}/friends/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserFriends)

      fetch(`${fetchUrl}/friends_pending/${currentUser.id}`)
      .then(res => res.json())
      .then(setFriendInvites)
    }, 5000)

    return (() => {
      clearInterval(intervalId)
    })
  }, [])

  function addFriend(e) {
    e.preventDefault()
    if (inviteMode) {
      fetch(`${fetchUrl}/friend_invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          friend: formInput.toLocaleLowerCase()
        })
      })
      .then(res => res.json())
      // .then(console.log)
      .then(data => {
        console.log(data)
        if (data.result.match(/^Friend invite sent/)) {
          showAlert({type:"winner", message: data.result})
        } else {
          showAlert({type:"alert", message: data.result})
        }
      })
      setFormInput("")
      setInviteMode(!inviteMode)
    } else {
      setInviteMode(!inviteMode)
    }
  }

  const showFriends = userFriends.map(friend => <Friend key={friend.id} friend={friend} friendListPackage={friendListPackage}/>)

  const showInvites = friendInvites.map(friend => <Invites key={friend.id} currentUser={currentUser} friend={friend} showAlert={showAlert} />)
  // console.log(showFriends)

  return (
    <div id="friend-list">
      <div className="list-header">
        <p>{currentUser.username.slice(0, 1).toUpperCase()}{currentUser.username.slice(1)}'s friend list</p>
        <div className="exit-button" onClick={() => setShowFriends(false)}>
          <p>x</p>
        </div>
      </div>
      {showFriends}
      {
        showInvites.length > 0 ? (
          <div id="pending-invite-list">
            <p>------------ Pending invities -----------</p>
            {showInvites}
          </div>
        ) : (
          null
        )
      }
      <div id="add-friend">
        <form>
          {
            inviteMode ? (
              <input type="text" placeholder="Enter user name" value={formInput} onChange={e => setFormInput(e.target.value)} required />
            ) : (
              null
            )
          }
          <button type="submit" onClick={addFriend}>
            <img id="add-friend-img" src="https://img.icons8.com/external-wanicon-two-tone-wanicon/64/000000/external-add-friend-friendship-wanicon-two-tone-wanicon.png" alt="add-friend-img"/>
          </button>
        </form>
      </div>
    </div>
  );
}

export default FriendList;