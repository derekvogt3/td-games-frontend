import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUrl } from "./utilities/GlobalVariables";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./components/homepage/HomePage";
import TicTacToe from "./components/games/TicTacToe/TicTacToe";
import FriendList from "./components/friends/FriendList";
import ChatList from "./components/chats/ChatList";
import MessageList from "./components/messages/MessageList";


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [userFriends, setUserFriends] = useState({})
  const [userChats, setUserChats] = useState({})
  const [showFriends, setShowFriends] = useState(false)
  const [showChats, setShowChats] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [chatId, setChatId] = useState("")

  useEffect(() => {
    if (currentUser.id) {
      fetch(`${fetchUrl}/friends/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserFriends)

      fetch(`${fetchUrl}/chats/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserChats)

      setShowFriends(false)
      setShowChats(false)
      setShowMessages(false)
    }
  }, [currentUser])

  // packages for all states and functions to carry down to children
  const loginFormPackage = {currentUser, setCurrentUser, setShowFriends, setShowChats, setShowMessages}
  const friendListPackage = {currentUser, setChatId, setShowFriends, setShowChats, setShowMessages}
  const chatListPackage = {currentUser, setChatId, setShowFriends, setShowChats, setShowMessages}
  const messageListPackage = {currentUser, chatId, setShowMessages}

  return (
    <BrowserRouter>
      <Header loginFormPackage={loginFormPackage} />
      {/* only show the following list when corrsponding button are clicked */}
      {
        showFriends ? (
          <FriendList friendListPackage={friendListPackage} />
        ) : (
          null
        )
      }
      {
        showChats ? (
          <ChatList chatListPackage={chatListPackage} />
        ) : (
          null
        )
      }
      {
        showMessages ? (
          <MessageList messageListPackage={messageListPackage} />
        ) : (
          null
        )
      }
      <div id="header-placeholder"></div>
      <div id="content">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/tictactoe" element={<TicTacToe />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
