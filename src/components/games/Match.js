import React from "react";

export default function Match({ usermatch, friend, currentUser }) {
  const Img = friend.profile_img
    ? friend.profile_img
    : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png";
  const online = friend.is_login
    ? { backgroundColor: "green" }
    : { backgroundColor: "red" };
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
      <div className="friend-name">
        <p>
          <i>
            {usermatch.status.slice(0, 1).toUpperCase()}
            {usermatch.status.slice(1)}
          </i>
        </p>
      </div>
    </div>
  );
}
