import "./Friend.css"

function Friend({friend}) {
  const {id, username, profile_img, is_login} = friend

  const Img = profile_img ? profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
  const online = is_login ? {backgroundColor: "green"} : {backgroundColor: "red"}

  return (
    <div className="friend">
      <div className="profile-img-holder">
        <img className="profile-img" src={Img} alt={username} />
        <div className="online-status" style={online}></div>
      </div>
      <div className="friend-name">
        <p>{username.slice(0, 1).toUpperCase()}{username.slice(1)}</p>
      </div>
      <div>
        <img className="start-message" src="https://img.icons8.com/cotton/64/000000/chat.png"/>
      </div>
    </div>
  );
}

export default Friend;
