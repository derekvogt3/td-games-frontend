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
import AlertBox from "./utilities/AlertBox";

function App() {
  const [firstEnter, setFirstEnter] = useState(true)
  const [introStyle, setIntroStyle] = useState({opacity: "1"})
  const [currentUser, setCurrentUser] = useState({});
  // const [userFriends, setUserFriends] = useState({})
  // const [userChats, setUserChats] = useState({})
  const [showFriends, setShowFriends] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [onAlert, setOnAlert] = useState(false);
  const [alert, setAlert] = useState({type: "alert", message: "alert"})
  const [chatId, setChatId] = useState("");
  
  const timeOutIds = []

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
    timeOutIds.push(setTimeout(() => {
      setIntroStyle({opacity: "0"})
      console.log("change")
    }, 11000))
    timeOutIds.push(setTimeout(() => {
      setFirstEnter(false)
    }, 14000))

    return (() => timeOutIds.forEach(id => clearInterval(id)))
  }, [])

  function skipIntro(e) {
    e.target.style.pointEvents = "none"
    setIntroStyle({opacity: "0"})
    setTimeout(() => {
      setFirstEnter(false)
    }, 3000);
    timeOutIds.forEach(id => clearInterval(id))
  }

  function showAlert(message) {
    setAlert(message)
    setOnAlert(true)
  }

  // packages for all states and functions to carry down to children
  const loginFormPackage = {
    currentUser,
    setCurrentUser,
    setShowFriends,
    setShowChats,
    setShowMessages,
    showAlert,
  };
  const friendListPackage = {
    currentUser,
    setChatId,
    setShowFriends,
    setShowChats,
    setShowMessages,
    setAlert,
    showAlert,
  };
  const chatListPackage = {
    currentUser,
    setChatId,
    setShowFriends,
    setShowChats,
    setShowMessages,
    setAlert,
    showAlert,
  };
  const messageListPackage = { 
    currentUser, 
    chatId, 
    setShowMessages,
    setAlert,
    showAlert,
  };

  return (
    <BrowserRouter>
      {
        firstEnter ? (
          <div id="intro" style={introStyle} onClick={skipIntro}>
            <Pixel title="TD GAMES"/>
          </div>
        ) : (
          null
        )
      }
      {
        onAlert ? (
          <AlertBox setOnAlert={setOnAlert} alert={alert} />
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
