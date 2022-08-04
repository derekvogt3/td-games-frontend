import React from "react";
import "./Connect4.css";
import Connect4Square from "./Connect4Square";
import { useState } from "react";

export default function Connect4() {
  const [board, setboard] = useState([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isWinner, setisWinner] = useState(false);

  const fullBoard = board.map((row, rowIdx) => {
    return row.map((val, colIdx) => {
      return (
        <Connect4Square
          key={colIdx + "" + rowIdx}
          setboard={setboard}
          colIdx={colIdx}
          rowIdx={rowIdx}
          value={val}
          currentPlayer={currentPlayer}
          board={board}
          setCurrentPlayer={setCurrentPlayer}
          setisWinner={setisWinner}
        />
      );
    });
  });

  return (
    <div className="main-Page-Container">
      <h1>Current Player is {currentPlayer}</h1>
      <div className="cf-Container">{fullBoard}</div>
      <h1>Is winner? {isWinner ? "Yes" : "No"}</h1>
    </div>
  );
}
