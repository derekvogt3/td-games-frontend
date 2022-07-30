import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./pages/header/Header";
import HomePage from "./pages/HomePage";
import TicTacToe from "./pages/TicTacToe";
import FriendList from "./pages/friends/FriendList";
import ChatList from "./pages/chats/ChatList";


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [userFriends, setUserFriends] = useState({})
  const [userChats, setUserChats] = useState({})
  const [showFriends, setShowFriends] = useState(false)
  const [showChats, setShowChats] = useState(false)

  useEffect(() => {
    if (currentUser.id) {
      fetch(`http://localhost:9292/friends/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserFriends)

      fetch(`http://localhost:9292/friends/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserChats)
    }
  }, [currentUser])
  
  // packages for all states and functions to carry down to children
  const loginFormPackage = {currentUser, setCurrentUser, setShowFriends, setShowChats}
  const friendListPackage = {userFriends}
  const chatListPackage = {userChats}

  return (
    <BrowserRouter>
      <Header loginFormPackage={loginFormPackage} />
      {showFriends ? (
        <FriendList friendListPackage={friendListPackage} />
      ) : (
        null
      )}
      {showChats ? (
        <ChatList chatListPackage={chatListPackage} />
      ) : (
        null
      )}
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
