import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./TicTacToe.module.css";

function TicTacToe({ ticTacToePackage }) {
  const {currentUser, showAlert} = ticTacToePackage
  const [board, setboard] = useState(Array(9).fill(" "));
  const [currentSide, setCurrentSide] = useState("X")
  const [gameStarted, setGameStarted] = useState(false);

  const boardRef = useRef()

  // temporary, until the invite match lead to this page
  const matchId = 1
  const friendId = 2
  const friendName = "Derek"
  // const sides = {"X": `${currentUser.username.slice(0, 1).toUpperCase()}${currentUser.username.slice(1)}`, "O": "Derek"}
  const sides = {"X": 1, "O": 2}

  // to disable board if not current player
  // useEffect(() => {
  //   if (sides[current_player] == currentUser.id) {
  //     boardRef.current.style.pointerEvents = "auto"
  //   } else {
  //     boardRef.current.style.pointerEvents = "none"
  //   }
  // }, [currentSide])

  // --------------------------- tic tac toe logics -----------------------------
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  function move(index, currentSide) {
    board[index] = currentSide
  }

  function turn_count() {
    return board.filter(index => index != " ").length
  }

  function current_player() {
    return turn_count % 2 == 0 ? "O" : "X"
  }

  function won() {
    let win = false
    winCombinations.forEach(combo => {
      if (board[combo[0]] != " " && board[combo[0]] == board[combo[1]] && board[combo[1]] == board[combo[2]]) {
        win = board[combo[0]]
        if (sides[win] == currentUser.id) {
          setTimeout(() => {
            showAlert({type:"winner", message: "You win!"})
          }, 1000)
        } else {
          setTimeout(() => {
            showAlert({type:"alert", message: "You lose!"})
          }, 1000)
        }
      }
    })
    return win
  }

  function full() {
    return board.filter(index => index == " ").length == 0 ? !won() : false
  }

  function draw() {
    return full() && !won()
  }

  function over() {
    return draw() || won()
  }

// ---------------------------------------------------------------------------------

  function play(e, index, currentSide) {
    e.target.textContent = currentSide
    currentSide == "X" ? e.target.style.color = "red" : e.target.style.color = "blue"
    e.target.parentNode.style.transform = "rotateY(180deg)"
    e.target.parentNode.style.pointerEvents = "none"
    move(index, currentSide)
    console.log(won())
    if (over()) {
      if (draw()) {
        setTimeout(() => {
          showAlert({type:"alert", message: "Draw!"})
        }, 1000)
      } else if(won()) {
        e.target.parentNode.parentNode.parentNode.style.pointerEvents = "none"
        console.log(won())
      }
    } else {
      setCurrentSide(currentSide => currentSide == "X" ? "O" : "X")
      console.log("continue")
    }
  }

  return (
    <>
      <div className={styles.mainPageContainer}>
        <div className={styles.tttContainer} ref={boardRef}>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 0, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 1, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 2, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 3, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 4, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 5, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 6, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 7, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.front} onClick={e => play(e, 8, currentSide)}>
              <div className={styles.back}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
