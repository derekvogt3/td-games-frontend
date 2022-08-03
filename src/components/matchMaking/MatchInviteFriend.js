import React from "react";
import { useEffect, useState } from "react";
import "./MatchInviteFriend.css";
import { fetchUrl } from "../../utilities/GlobalVariables";
import MatchFriend from "./MatchFriend";

export default function MatchInviteFriend({
  currentUser,
  setShowInvite,
  gameId,
}) {
  const [userFriends, setUserFriends] = useState([]);
  const [friendInvites, setFriendInvites] = useState([]);

  useEffect(() => {
    fetch(`${fetchUrl}/friends/${currentUser.id}`)
      .then((res) => res.json())
      .then(setUserFriends);

    fetch(`${fetchUrl}/friends_pending/${currentUser.id}`)
      .then((res) => res.json())
      .then(setFriendInvites);

    // keep checking friends online status
    const intervalId = setInterval(() => {
      fetch(`${fetchUrl}/friends/${currentUser.id}`)
        .then((res) => res.json())
        .then(setUserFriends);

      fetch(`${fetchUrl}/friends_pending/${currentUser.id}`)
        .then((res) => res.json())
        .then(setFriendInvites);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const showFriends = userFriends.map((friend) => {
    return (
      <MatchFriend
        key={friend.id}
        friend={friend}
        currentUser={currentUser}
        gameId={gameId}
      />
    );
  });

  return (
    <>
      <div id="invite-list">
        <div className="list-header">
          <p>
            {currentUser.username.slice(0, 1).toUpperCase()}
            {currentUser.username.slice(1)}'s friend list
          </p>
          <div
            className="match-exit-button"
            onClick={() => setShowInvite(false)}
          >
            <p>x</p>
          </div>
        </div>
        {showFriends}
      </div>
    </>
  );
}
