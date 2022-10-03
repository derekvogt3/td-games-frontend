import React from "react";
import { useState } from "react";
import "./MatchFriend.css";

export default function MatchFriend({ friend, currentUser, gameId }) {
  const [diffculty, setDiffculty] = useState("normal");
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
      diffculty: diffculty,
    };
    fetch(`/create_game`, {
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
  console.log(diffculty);
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
            <i onClick={() => setInvited(!invited)}>Invite Sent</i>
          </p>
        ) : (
          <button className="button-70" onClick={inviteFriend}>
            Invite to Game
          </button>
        )}
      </div>
      <div className="match-friend-diff">
        <p>Diffculty:</p>
        <select
          value={diffculty}
          onChange={(e) => setDiffculty(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
        </select>
      </div>
    </div>
  );
}
