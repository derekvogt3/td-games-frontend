import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUrl } from "./utilities/GlobalVariables";

import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./components/homepage/HomePage";
import FriendList from "./components/friends/FriendList";
import ChatList from "./components/chats/ChatList";
import MessageList from "./components/messages/MessageList";
import Pixel from "./utilities/PixelArt";
import AlertBox from "./utilities/AlertBox";
import MatchMaking from "./components/matchMaking/MatchMaking";
import TicTacToe from "./components/games/TicTacToe/TicTacToe";
import Settings from "./components/settings/Settings";

function App() {
  const [firstEnter, setFirstEnter] = useState(true);
  const [introStyle, setIntroStyle] = useState({ opacity: "1" });
  const [currentUser, setCurrentUser] = useState({});
  const [showFriends, setShowFriends] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [onAlert, setOnAlert] = useState(false);
  const [alert, setAlert] = useState({ type: "alert", message: "alert" });
  const [chatId, setChatId] = useState("");
  const [unreadMessages, setUnreadMessages] = useState([])

  const timeOutIds = [];

  useEffect(() => {
    let sessionUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionUser) {
      setCurrentUser(sessionUser);
    }
  }, []);

  // close all lists when user changes
  useEffect(() => {
    if (currentUser.id) {
      fetch(`${fetchUrl}/messages_unread/${currentUser.id}`)
      .then(res => res.json())
      .then(setUnreadMessages)

      setShowFriends(false);
      setShowChats(false);
      setShowMessages(false);
      setShowSettings(false);
    }
  }, [currentUser]);

  // track unread messages
  useEffect(() => {
    let intervalId
    if (currentUser.id) {
      intervalId = setInterval(() => {
        fetch(`${fetchUrl}/messages_unread/${currentUser.id}`)
        .then(res => res.json())
        .then(setUnreadMessages)
      }, 2000)
    }

    return (() => clearInterval(intervalId))
  }, [currentUser]);

  // to set intro animations
  useEffect(() => {
    timeOutIds.push(
      setTimeout(() => {
        setIntroStyle({ opacity: "0" });
      }, 11000)
    );
    timeOutIds.push(
      setTimeout(() => {
        setFirstEnter(false);
      }, 14000)
    );

    return () => timeOutIds.forEach((id) => clearInterval(id));
  }, []);

  function skipIntro(e) {
    e.target.style.pointEvents = "none";
    setIntroStyle({ opacity: "0" });
    setTimeout(() => {
      setFirstEnter(false);
    }, 3000);
    timeOutIds.forEach((id) => clearInterval(id));
  }

  // to show alert box
  function showAlert(message) {
    setAlert(message);
    setOnAlert(true);
  }

  // packages for all states and functions to carry down to children
  const loginFormPackage = {
    currentUser,
    unreadMessages,
    setCurrentUser,
    setShowFriends,
    setShowChats,
    setShowMessages,
    showAlert,
    setShowSettings,
  };
  const friendListPackage = {
    currentUser,
    unreadMessages,
    setChatId,
    setShowFriends,
    setShowChats,
    setShowMessages,
    showAlert,
    setShowSettings,
  };
  const chatListPackage = {
    currentUser,
    unreadMessages,
    setChatId,
    setShowFriends,
    setShowChats,
    setShowMessages,
    showAlert,
    setShowSettings,
  };
  const messageListPackage = {
    currentUser,
    chatId,
    setShowMessages,
    showAlert,
  };
  const ticTacToePackage = {
    currentUser,
    showAlert,
  };

  const showSettingsPackage = {
    currentUser,
    setShowFriends,
    setShowChats,
    setShowMessages,
    setShowSettings,
    setCurrentUser,
  };

  return (
    <BrowserRouter>
      {firstEnter ? (
        <div id="intro" style={introStyle} onClick={skipIntro}>
          <Pixel title="TD GAMES" />
        </div>
      ) : null}
      {onAlert ? <AlertBox setOnAlert={setOnAlert} alert={alert} /> : null}
      <Header loginFormPackage={loginFormPackage} />
      {/* only show the following list when corrsponding button are clicked */}
      {showFriends ? (
        <FriendList friendListPackage={friendListPackage} />
      ) : null}
      {showChats ? <ChatList chatListPackage={chatListPackage} /> : null}
      {showMessages ? (
        <MessageList messageListPackage={messageListPackage} />
      ) : null}
      {showSettings ? (
        <Settings showSettingsPackage={showSettingsPackage} />
      ) : null}
      <div id="header-placeholder"></div>
      <div id="content">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/match-making/:game_id"
            element={
              currentUser.id ? (
                <MatchMaking currentUser={currentUser} gameId={1} />
              ) : (
                <h1>Login to Play Game</h1>
              )
            }
          ></Route>
          <Route
            path="/tictactoe/:matcj_id"
            element={<TicTacToe ticTacToePackage={ticTacToePackage} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
