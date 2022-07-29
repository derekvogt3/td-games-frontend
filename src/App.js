import "./App.css";
import TicTacToe from "./pages/TicTacToe";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/tictactoe" element={<TicTacToe />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
