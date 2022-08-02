import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./TicTacToe.module.css";
import { fetchUrl } from "../../../utilities/GlobalVariables";
import { useLocation } from "react-router-dom";

function TicTacToe({ ticTacToePackage }) {
  const { currentUser, showAlert } = ticTacToePackage;
  const [board, setboard] = useState(Array(9).fill(" "));
  const [currentSide, setCurrentSide] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [friend, setFriend] = useState({});
  const [gameSettings, setGameSettings] = useState({});

  const location = useLocation();
  const matchId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const boardRef = useRef();

  useEffect(() => {
    fetch(`${fetchUrl}/tic_tac_toe_match_data?match_id=${matchId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.match.game_status);
        setboard(JSON.parse(data.match.game_status).board);
        console.log(JSON.parse(data.match.game_settings));
        setGameSettings(JSON.parse(data.match.game_settings));
        setCurrentSide(() => {
          if (data.history === "new game") {
            setCurrentSide("X");
            console.log(won());
          } else {
            //
            //data.history.history
            // data;

            console.log("aahahahahahlsdkfasdlkfjasdkfj");
          }
        });
        console.log(data);
      });
  }, []);

  // --------------------------- tic tac toe logics -----------------------------
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function move(index, currentSide) {
    board[index] = currentSide;
  }

  function turn_count() {
    return board.filter((index) => index != " ").length;
  }

  function won() {
    let win = false;
    winCombinations.forEach((combo) => {
      if (
        board[combo[0]] != " " &&
        board[combo[0]] == board[combo[1]] &&
        board[combo[1]] == board[combo[2]]
      ) {
        win = board[combo[0]];
        if (gameSettings[win] == currentUser.id) {
          setTimeout(() => {
            showAlert({ type: "winner", message: "You win!" });
          }, 1000);
        } else {
          setTimeout(() => {
            showAlert({ type: "alert", message: "You lose!" });
          }, 1000);
        }
      }
    });
    return win;
  }

  function full() {
    return board.filter((index) => index == " ").length == 0 ? !won() : false;
  }

  function draw() {
    return full() && !won();
  }

  function over() {
    return draw() || won();
  }

  // ---------------------------------------------------------------------------------

  function play(e, index, currentSide) {
    let playObj = {
      player: currentSide,
      position: index,
      user_id: currentUser.id,
      match_id: matchId,
      game_status: JSON.stringify({ board: board }),
    };
    fetch(`${fetchUrl}/tic_tac_toe_move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(playObj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    e.target.textContent = currentSide;
    currentSide == "X"
      ? (e.target.style.color = "red")
      : (e.target.style.color = "blue");
    e.target.parentNode.style.transform = "rotateY(180deg)";
    e.target.parentNode.style.pointerEvents = "none";
    move(index, currentSide);
    console.log(won());
    if (over()) {
      if (draw()) {
        setTimeout(() => {
          showAlert({ type: "alert", message: "Draw!" });
        }, 1000);
      } else if (won()) {
        e.target.parentNode.parentNode.parentNode.style.pointerEvents = "none";
        console.log(won());
      }
    } else {
      setCurrentSide((currentSide) => (currentSide == "X" ? "O" : "X"));
      console.log("continue");
    }
  }

  return (
    <>
      <div className={styles.mainPageContainer}>
        <div className={styles.tttContainer} ref={boardRef}>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 0, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 1, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 2, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 3, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 4, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 5, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 6, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 7, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 8, currentSide)}
            >
              <div className={styles.back}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
