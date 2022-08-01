import { useEffect, useState } from "react"
import { fetchUrl } from "../../components/GlobalVariables";
import "./Invites.css"

function Invites({currentUser, friend}) {
  const [invite, setInvite] = useState({})

  useEffect(() => {
    fetch(`${fetchUrl}/friends_relation?user_id=${currentUser.id}&friend_id=${friend.id}`)
    .then(res => res.json())
    .then(data => setInvite(data))

    // keep checking friends online status
    const intervalId = setInterval(() => {
      fetch(`${fetchUrl}/friends_relation?user_id=${currentUser.id}&friend_id=${friend.id}`)
      .then(res => res.json())
      .then(data => setInvite(data))
    }, 5000)

    return (() => {
      clearInterval(intervalId)
    })
  }, [])

  function cancelInvite(e) {
    e.target.style.pointerEvents = "none"
    fetch(`${fetchUrl}/delete_relations?user_id=${currentUser.id}&friend_id=${friend.id}&method=delete`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .catch(console.error)
  }

  function declineInvite(e) {
    e.target.style.pointerEvents = "none"
    fetch(`${fetchUrl}/delete_relations?user_id=${currentUser.id}&friend_id=${friend.id}&method=decline`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .catch(console.error)
  }

  function acceptInvite(e) {
    e.target.style.pointerEvents = "none"
    fetch(`${fetchUrl}/accept_relations?user_id=${currentUser.id}&friend_id=${friend.id}`)
    .then(res => res.json())
    .catch(console.error)
  }
  
  const Img = friend.profile_img ? friend.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
  const online = {backgroundColor: "gray"}

  return (
    <div className="invite">
      <div className="profile-img-holder">
        <img className="profile-img" src={Img} alt={friend.username} />
        <div className="online-status" style={online}></div>
      </div>
      {
        invite.id ? (
          <>
            {
              invite.invited_by == currentUser.id ? (
                <div className="invite-sender">
                  <div>
                    {invite.accepted == "pending" ? <p className="invite-message" style={{color: "green"}}>Pending invite for</p> : null }
                    <p>{friend.username.slice(0, 1).toUpperCase()}{friend.username.slice(1)}</p>
                    {invite.accepted == "declined" ? <p className="invite-message" style={{color: "red"}}>Declined your invitation!</p> : null }
                  </div>
                  <img src="https://img.icons8.com/external-happy-man-bomsymbols-/91/000000/external-cancel-happy-man-human-resource-and-life-style-set-1-happy-man-bomsymbols-.png" onClick={cancelInvite}/>
                </div>
              ) : (
                <div className="invite-receiver">
                  <div>
                    <p>{friend.username.slice(0, 1).toUpperCase()}{friend.username.slice(1)}</p>
                    <p className="invite-message">wanted to be friend with you</p>
                  </div>
                  <img className="accept-invite" src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-Accept-round-icons-others-inmotus-design-3.png" onClick={acceptInvite}/>
                  <img className="decline-invite" src="https://img.icons8.com/external-others-inmotus-design/67/000000/external-Cancel-round-icons-others-inmotus-design-8.png" onClick={declineInvite}/>
                </div>

              )
            }
          </>
        ) : (
          null
        )
      }
    </div>
  );
}

export default Invites;