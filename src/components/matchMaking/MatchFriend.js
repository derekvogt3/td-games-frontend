import React from "react";
import { fetchUrl } from "../../utilities/GlobalVariables";
import { useState, useEffect } from "react";

export default function MatchFriend({ friend, currentUser, gameId }) {
  const [invited, setInvited] = useState(false);

  const Img = friend.profile_img
    ? friend.profile_img
    : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png";
  const online = friend.is_login
    ? { backgroundColor: "green" }
    : { backgroundColor: "red" };

  function inviteFriend() {
    let inviteObj = {
      user_id: currentUser.id,
      game_id: gameId,
      friend_id: friend.id,
    };
    fetch(`${fetchUrl}/create_game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(inviteObj),
    })
      .then((res) => res.json())
      .then((data) => setInvited(true));
  }

  return (
    <div className="friend">
      <div className="profile-img-holder">
        <img className="profile-img" src={Img} alt={friend.username} />
        <div className="online-status" style={online}></div>
      </div>
      <div className="friend-name">
        <p>
          {friend.username.slice(0, 1).toUpperCase()}
          {friend.username.slice(1)}
        </p>
      </div>

      <div className="match-row">
        {invited ? (
          <p>
            <i>Invite Sent</i>
          </p>
        ) : (
          <button className="button-70" onClick={inviteFriend}>
            Invite to Game
          </button>
        )}
      </div>
    </div>
  );
}
