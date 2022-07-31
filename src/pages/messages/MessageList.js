import "./MessageList.css"
import { useEffect, useRef, useState } from "react";
import MyMessage from "./MyMessage";

function MessageList({messageListPackage}) {
  const [formInput, setFormInput] = useState("")
  const [messages, setMessages] = useState([])
  const {currentUser, chatId} = messageListPackage

  const messageListRef = useRef()
  
  useEffect(() => {
    fetch(`http://localhost:9292/messages?chat_id=${chatId}`)
    .then(res => res.json())
    .then(setMessages)
  },[])
  
  const showMessages = messages.map(message => {
    return <MyMessage key={message.id} message={message}/>
  })
  
  if (messageListRef.current) {
    setTimeout(() => {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }, 100)
  }

  function sendMessage(e) {
    e.preventDefault()
    fetch(`http://localhost:9292/messages`, {
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
      fetch(`http://localhost:9292/messages?chat_id=${chatId}`)
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