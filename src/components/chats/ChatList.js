import { useEffect, useState } from "react";
import "./ChatList.css";
import Chat from "./Chat";

function ChatList({ chatListPackage }) {
  const { currentUser, setShowChats } = chatListPackage;
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    fetch(`/chats/${currentUser.id}`)
      .then((res) => res.json())
      .then(setUserChats);

    // keep checking friends online status
    const intervalId = setInterval(() => {
      fetch(`/chats/${currentUser.id}`)
        .then((res) => res.json())
        .then(setUserChats);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const showChats = userChats.map((chat) => (
    <Chat key={chat.id} chat={chat} chatListPackage={chatListPackage} />
  ));

  return (
    <div id="chat-list">
      <div className="list-header">
        <p>
          {currentUser.username.slice(0, 1).toUpperCase()}
          {currentUser.username.slice(1)}'s chat list
        </p>
        <div className="exit-button" onClick={() => setShowChats(false)}>
          <p>x</p>
        </div>
      </div>
      {showChats}
    </div>
  );
}

export default ChatList;
