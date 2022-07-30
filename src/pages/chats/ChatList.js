import "./ChatList.css"
import Chat from "./Chat";

function ChatList({chatListPackage}) {
  const {userChats} = chatListPackage

  const showChats = userChats.map(chat => <Chat key={chat.id} chat={chat} />)

  console.log(userChats)

  return (
    <div id="chat-list">
      {showChats}
    </div>
  );
}

export default ChatList;