import { useEffect, useState } from "react";
import "./Message.css"

function MyMessage({currentUser, message}) {
  const [sender, setSender] = useState({})
  const [style, setStyle] = useState({flexDirection: "row"})

  const Img = sender.profile_img ? sender.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
  const online = sender.is_login ? {backgroundColor: "green"} : {backgroundColor: "red"}

  useEffect(() => {
    fetch(`http://localhost:9292/users/${message.user_id}`)
    .then(res => res.json())
    .then(setSender)
  }, [])

  useEffect(() => {
    if (sender.id) {
      if (currentUser.id != sender.id) {
        setStyle({flexDirection: "row-reverse"})
      }
    }
  }, [sender])

  return (
    <>
      {
        sender.username ? (
          <div className="my-message" style={style}>
            <div className="profile-img-holder">
              <img className="profile-img" src={Img} alt={sender.username} />
              <div className="online-status" style={online}></div>
            </div>
            <div className="message-holder">
              <div className="message-info" style={style}>
                <p className="message-sender">{sender.username.slice(0, 1).toUpperCase()}{sender.username.slice(1)}</p>
                <p className="message-time">{message.created_at.slice(0,10)} {message.created_at.slice(11,19)}</p>
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