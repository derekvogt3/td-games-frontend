import { useEffect, useState } from "react";
import { fetchUrl } from "../../components/GlobalVariables";
import "./Message.css"

function MyMessage({currentUser, usersStatus, message}) {
  const [sender, setSender] = useState({})
  const [style, setStyle] = useState({flexDirection: "row"})
  const [editMode, setEditMode] = useState(false)
  const [editFromInput, setEditFromInput] = useState(message.message)

  const Img = sender.profile_img ? sender.profile_img : "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"
  const online = usersStatus[sender.username] ? {backgroundColor: "green"} : {backgroundColor: "red"}

  useEffect(() => {
    fetch(`${fetchUrl}/users/${message.user_id}`)
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

  function editMessage(e) {
    e.preventDefault()
    fetch(`${fetchUrl}/messages/${message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        message: editFromInput
      })
    })
    .then(res => res.json())
    .then(() => setEditMode(false))
    .catch(console.error)
  }

  function deleteMessage() {
    fetch(`${fetchUrl}/messages/${message.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => console.log("message deleted"))
    .catch(console.error)
  }

  return (
    <>
      {
        // only show elements when fetch data are back
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
                {
                  message.created_at != message.updated_at ? (
                    <p className="message-edited-tag">Edited</p>
                  ) : (
                    null
                  )
                }
              </div>
              <div className="message">
                <p>{message.message}</p>
              </div>
            </div>
            {
              // only show element when the message were sent by user
              currentUser.id == sender.id ? (
                <div className="edit-mode">
                  <img className="message-edit-btn" src="https://img.icons8.com/ios/50/000000/edit-chat-history.png" alt="edit" onClick={() => setEditMode(!editMode)}/>
                  <img className="message-recall-btn" src="https://img.icons8.com/external-solid-style-bomsymbols-/65/000000/external-bin-business-shop-finance-solid-style-set-2-solid-style-bomsymbols-.png" alt="recall" onClick={deleteMessage}/>
                  {
                    // only show edit form when in edit mode
                    editMode ? (
                      <form className="message-edit-form" onSubmit={editMessage}>
                        <input type="text" value={editFromInput} onChange={e => setEditFromInput(e.target.value)} />
                        <button type="submit">
                          <img src="https://img.icons8.com/ios/50/000000/edit-chat-history.png" alt="edit"/>
                        </button>
                      </form>
                    ) : (
                      null
                    )
                  }
                </div>
              ) : (
                null
              )
            }
          </div>
        ) : (
          null
        )
      }
    </>
  );
}

export default MyMessage;