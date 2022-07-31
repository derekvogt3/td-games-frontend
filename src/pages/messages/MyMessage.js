import { useEffect, useState } from "react";
import "./MyMessage.css"

function MyMessage({message}) {
  const [user, setUser] = useState({})

  const Img = user.profile_img ? user.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
  const online = user.is_login ? {backgroundColor: "green"} : {backgroundColor: "red"}

  useEffect(() => {
    fetch(`http://localhost:9292/users/${message.user_id}`)
    .then(res => res.json())
    .then(setUser)
  }, [])
  
  return (
    <>
      {
        user.username ? (
          <div className="my-message">
            <div className="profile-img-holder">
              <img className="profile-img" src={Img} alt={user.username} />
              <div className="online-status" style={online}></div>
            </div>
            <div className="message-holder">
              <div>
                <p className="message-sender">{user.username.slice(0, 1).toUpperCase()}{user.username.slice(1)}</p>
                <p className="message-time">{message.created_at}</p>
              </div>
              <div className="message">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ) : (
          null
        )
      }
    </>
  );
}

export default MyMessage;