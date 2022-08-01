import React from "react";
import { useEffect } from "react";
import "./InviteFriend.css";

export default function InviteFriend({ currentUser }) {
  useEffect(() => {
    console.log("invite friend");
    console.log(currentUser);
  }, []);
  return (
    <>
      <div id="invite-list">
        <div className="list-header">
          <p>
            {currentUser.username.slice(0, 1).toUpperCase()}
            {currentUser.username.slice(1)}'s friend list
          </p>
          <div className="exit-button">
            <p>x</p>
          </div>
        </div>
      </div>
    </>
  );
}
