import "./ChatList.css"
import Chat from "./Chat";

function ChatList({chatListPackage}) {
  const {userChats, setChatId} = chatListPackage

  const showChats = userChats.map(chat => <Chat key={chat.id} chat={chat} setChatId={setChatId} />)
  
  return (
    <div id="chat-list">
      {showChats}
    </div>
  );
}

export default ChatList;