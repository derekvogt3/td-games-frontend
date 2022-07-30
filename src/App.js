import "./App.css";
import Header from "./pages/header/Header";
import HomePage from "./pages/HomePage";
import TicTacToe from "./pages/TicTacToe";

import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendList from "./pages/friends/FriendList";

function App() {
  const [currentUser, setCurrentUser] = useState([])
  const [showFriends, setShowFriends] = useState(false)
  
  // packages for all states and functions to carry down to children
  const loginFormPackage = {currentUser, setCurrentUser, showFriends, setShowFriends}

  return (
    <BrowserRouter>
      <Header loginFormPackage={loginFormPackage} />
      {showFriends ? (
        <FriendList />
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
