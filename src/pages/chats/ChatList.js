import Chat from "./Chat";
import "./ChatList.css"

function ChatList({chatListPackage}) {
  const {userChats} = chatListPackage
  const showChats = userChats.map(chat => <Chat key={chat.id} chat={chat} />)

  return (
    <div id="chat-list">
      {showChats}
    </div>
  );
}

export default ChatList;