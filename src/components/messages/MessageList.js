import "./MessageList.css"
import { useEffect, useRef, useState } from "react";
import { fetchUrl } from "../../utilities/GlobalVariables";
import Message from "./Message";

function MessageList({messageListPackage}) {
  const {currentUser, chatId, setShowMessages} = messageListPackage
  const [formInput, setFormInput] = useState("")
  const [messages, setMessages] = useState([])
  const [usersStatus, setUsersStatus] = useState({})

  
  useEffect(() => {
    fetch(`${fetchUrl}/messages?chat_id=${chatId}`)
    .then(res => res.json())
    .then(setMessages)

    // keep checking new message from the server
    const intervalId = setInterval(() => {
      fetch(`${fetchUrl}/messages?chat_id=${chatId}`)
      .then(res => res.json())
      .then(setMessages)

      fetch(`${fetchUrl}/chat_members/${chatId}`)
      .then(res => res.json())
      .then(data => {
        const status = {}
        data.forEach(member => status[member.username] = member.is_login)
        setUsersStatus(status)
      })
      // console.log("run interval")
    }, 1000)
    
    return (() => {
      clearInterval(intervalId)
      // console.log("stop interval")
    })
  }, [])
  
  const showMessages = messages.map(message => {
    return <Message key={message.id} currentUser={currentUser} usersStatus={usersStatus} message={message}/>
  })
  
  // keep the scroll on the bottom when there is new message
  const messageListRef = useRef()
  const messageLengthRef = useRef(messages.length)
  
  if (messageListRef.current) {
    if (messages.length > messageLengthRef.current) {
      setTimeout(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
      }, 100)
      messageLengthRef.current = messages.length
    }
  }

  function sendMessage(e) {
    e.preventDefault()
    fetch(`${fetchUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        user_id: currentUser.id,
        message: formInput
      })
    })
    .then(() =>{
      setFormInput("")
      fetch(`${fetchUrl}/messages?chat_id=${chatId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data)
      })
      .catch(console.error)
    })
    .catch(console.error)
  }

  return (
    <div id="message-window">
      <div className="list-header">
        <p>{currentUser.username.slice(0, 1).toUpperCase()}{currentUser.username.slice(1)}'s Messages</p>
        <div className="exit-button" onClick={() => setShowMessages(false)}>
          <p>x</p>
        </div>
      </div>
      <div id="message-list" ref={messageListRef}>
        {showMessages}
      </div>
      <div id="new-message">
        <img src="https://img.icons8.com/dusk/64/000000/add-user-group-man-man.png"/>
        <form onSubmit={sendMessage}>
          <input type="text" name="message" value={formInput} onChange={e => setFormInput(e.target.value)} maxLength="225" required />
          <button type="submit"><img src="https://img.icons8.com/ios-glyphs/30/000000/sent.png"/></button>
        </form>
      </div>
    </div>
  );
}

export default MessageList;