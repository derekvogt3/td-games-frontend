import { useEffect, useState } from "react";
import "./Chat.css"

function Chat({chat, setChatId}) {
  const {id} = chat 
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch(`http://localhost:9292/chat_members/${id}`)
    .then(res => res.json())
    .then(setMembers)

    const intervalId = setInterval(() => {
      fetch(`http://localhost:9292/chat_members/${id}`)
      .then(res => res.json())
      .then(setMembers)
    }, 5000)

    return (() => {
      clearInterval(intervalId)
    })
  }, [])

  const showMembers = members.map(member => {
    const Img = member.profile_img ? member.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
    const online = member.is_login ? {backgroundColor: "green"} : {backgroundColor: "red"}
    return (
      <div key={member.id} className="chat-member">
        <div className="profile-img-holder">
          <img className="profile-img" src={Img} alt={member.username} />
          <div className="online-status" style={online}></div>
        </div>
        <div className="chat-member-name">
          <p>{member.username.slice(0, 1).toUpperCase()}{member.username.slice(1)}</p>
        </div>
      </div>
    )
  })

  return (
    <div className="chat">
      <div className="chat-members">
        {showMembers}
      </div>
      <div>
        <img className="start-message" src="https://img.icons8.com/cotton/64/000000/chat.png"/>
      </div>
    </div>
  );
}

export default Chat;