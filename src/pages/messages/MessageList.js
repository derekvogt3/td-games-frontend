import { useEffect } from "react";
import "./MessageList.css"

function MessageList({messageListPackage}) {
  const {chatId} = messageListPackage

  useEffect(() => {
    console.log(chatId)
  })

  return (
    <div id="message-window">
      <div id="message-list">
        
      </div>
      <div id="new-message">
        <form>
          <input type="text" />
          <input type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default MessageList;