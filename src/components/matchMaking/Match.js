import React, { useEffect, useState } from "react";
import "./Match.css";
import { fetchUrl } from "../../utilities/GlobalVariables";
import { useNavigate } from "react-router-dom";

export default function Match({ usermatch, friend, currentUser }) {
  const [gameUrl, setGameUrl] = useState("/tictactoe/")

  const navigate = useNavigate();

  useEffect(() => {
    if (usermatch.diffculty === "normal") {
      setGameUrl("/tictactoe/")
    } else if (usermatch.diffculty === "medium") {
      setGameUrl("/tictactoemid/")
    }
  }, []);

  function handleAccept() {
    let obj = { match_id: usermatch.match_id };

    fetch(`${fetchUrl}/accept_invite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleReject() {
    let obj = { match_id: usermatch.match_id };
    fetch(`${fetchUrl}/reject_invite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

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
        <div className="match-info">
          <i>#{usermatch.id}:</i>
          <i>{usermatch.diffculty.slice(0, 1).toUpperCase()}{usermatch.diffculty.slice(1)}</i>
        </div>
      </div>

      {}

      <div className="match-row">
        {usermatch.status === "pending" ? (
          <>
            {usermatch.invited_by === currentUser.id ? (
              <p>
                <i>
                  {usermatch.status.slice(0, 1).toUpperCase()}
                  {usermatch.status.slice(1)}
                </i>
              </p>
            ) : (
              <div className="button-group-ar">
                <button className="button-68" onClick={handleAccept}>
                  accept
                </button>
                <button className="button-69" onClick={handleReject}>
                  reject
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {usermatch.status === "in match" ? (
              <button
                className="button-70"
                onClick={() => navigate(gameUrl + usermatch.match_id)}
              >
                Go to Match
              </button>
            ) : (
              <>
                {usermatch.status === "finished" ? (
                  <>
                    <p>
                      <i className>
                        {usermatch.status.slice(0, 1).toUpperCase()}
                        {usermatch.status.slice(1)}
                      </i>
                    </p>
                    <button
                      className="button-71"
                      onClick={() =>
                        navigate(gameUrl + usermatch.match_id)
                      }
                    >
                      See Results
                    </button>
                  </>
                ) : (
                  <p>
                    <i
                      className={
                        usermatch.status === "rejected" ? "rejected-text" : ""
                      }
                    >
                      {usermatch.status.slice(0, 1).toUpperCase()}
                      {usermatch.status.slice(1)}
                    </i>
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
