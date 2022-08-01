import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUrl } from "./utilities/GlobalVariables";


import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./components/homepage/HomePage";
import TicTacToe from "./components/games/TicTacToe/TicTacToe";
import FriendList from "./components/friends/FriendList";
import ChatList from "./components/chats/ChatList";
import MessageList from "./components/messages/MessageList";
import Pixel from "./utilities/PixelArt";

function App() {
  const [firstEnter, setFirstEnter] = useState(true)
  const [introStyle, setIntroStyle] = useState({opacity: "1"})
  const [currentUser, setCurrentUser] = useState({});
  // const [userFriends, setUserFriends] = useState({})
  // const [userChats, setUserChats] = useState({})
  const [showFriends, setShowFriends] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    let sessionUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionUser) {
      setCurrentUser(sessionUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      // fetch(`${fetchUrl}/friends/${currentUser.id}`)
      // .then(res => res.json())
      // .then(setUserFriends)

      // fetch(`${fetchUrl}/chats/${currentUser.id}`)
      // .then(res => res.json())
      // .then(setUserChats)

      setShowFriends(false);
      setShowChats(false);
      setShowMessages(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const timeOutIds = []
    setTimeout(() => {
      setIntroStyle({opacity: "0"})
      console.log("change")
    }, 11000)
    setTimeout(() => {
      setFirstEnter(false)
    }, 14000)

    return (() => timeOutIds.forEach(id => clearInterval(id)))
  }, [])

  // packages for all states and functions to carry down to children
  const loginFormPackage = {
    currentUser,
    setCurrentUser,
    setShowFriends,
    setShowChats,
    setShowMessages,
  };
  const friendListPackage = {
    currentUser,
    setChatId,
    setShowFriends,
    setShowChats,
    setShowMessages,
  };
  const chatListPackage = {
    currentUser,
    setChatId,
    setShowFriends,
    setShowChats,
    setShowMessages,
  };
  const messageListPackage = { currentUser, chatId, setShowMessages };

  return (
    <BrowserRouter>
      {
        firstEnter ? (
          <div id="intro" style={introStyle}>
            <Pixel title="TD GAMES"/>
          </div>
        ) : (
          null
        )
      }
      <Header loginFormPackage={loginFormPackage} />
      {/* only show the following list when corrsponding button are clicked */}
      {showFriends ? (
        <FriendList friendListPackage={friendListPackage} />
      ) : null}
      {showChats ? <ChatList chatListPackage={chatListPackage} /> : null}
      {showMessages ? (
        <MessageList messageListPackage={messageListPackage} />
      ) : null}
      <div id="header-placeholder"></div>
      <div id="content">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/tictactoe"
            element={
              currentUser != {} ? (
                <TicTacToe currentUser={currentUser} />
              ) : (
                <h1>Login to Play Game</h1>
              )
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
