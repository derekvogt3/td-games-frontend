import "./App.css";
import Header from "./pages/header/Header";
import HomePage from "./pages/HomePage";
import TicTacToe from "./pages/TicTacToe";

import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendList from "./pages/friends/FriendList";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [userFriends, setUserFriends] = useState({})
  const [showFriends, setShowFriends] = useState(false)

  useEffect(() => {
    if (currentUser.id) {
      fetch(`http://localhost:9292/friends/${currentUser.id}`)
      .then(res => res.json())
      .then(setUserFriends)
    }
  }, [currentUser])
  
  // packages for all states and functions to carry down to children
  const loginFormPackage = {currentUser, setCurrentUser, showFriends, setShowFriends}
  const friendListPackage = {userFriends}

  return (
    <BrowserRouter>
      <Header loginFormPackage={loginFormPackage} />
      {showFriends ? (
        <FriendList friendListPackage={friendListPackage} />
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
