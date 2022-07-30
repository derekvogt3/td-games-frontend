import "./App.css";
import TicTacToe from "./pages/TicTacToe";

import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const [currentUser, setCurrentUser] = useState([])
  const [users, setUsers] = useState([])
  
  const usersList = {}
  if (users.length > 0) {
    users.forEach(user => {
      usersList[user.username] = user.password
    })
  }
  
  useEffect(() => {
    fetch(`http://localhost:9292/users`)
    .then(res => res.json())
    .then(setUsers)
  }, [currentUser])
  
  // packages for all states and functions to carry down to children
  const loginFormPackage = {users, usersList, currentUser, setCurrentUser}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage loginFormPackage={loginFormPackage} />}></Route>
        <Route path="/tictactoe" element={<TicTacToe />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
