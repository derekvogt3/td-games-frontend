import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./TicTacToe.module.css";
import { fetchUrl } from "../../../utilities/GlobalVariables";
import { useLocation, useNavigate } from "react-router-dom";

function TicTacToe({ ticTacToePackage }) {
  const { currentUser, showAlert } = ticTacToePackage;
  const [board, setBoard] = useState(Array(9).fill(" "));
  const [gameSettings, setGameSettings] = useState({"X":[0,""],"O":[0,""]});
  const [currentSide, setCurrentSide] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [intervalId, setIntervalId] = useState(0)

  const navigate = useNavigate()

  const location = useLocation();
  const matchId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const boardRef = useRef();
  const fieldRef0 = useRef();
  const fieldRef1 = useRef();
  const fieldRef2 = useRef();
  const fieldRef3 = useRef();
  const fieldRef4 = useRef();
  const fieldRef5 = useRef();
  const fieldRef6 = useRef();
  const fieldRef7 = useRef();
  const fieldRef8 = useRef();
  const fieldRefs = [
    fieldRef0, fieldRef1, fieldRef2,
    fieldRef3, fieldRef4, fieldRef5,
    fieldRef6, fieldRef7, fieldRef8,
  ]

  useEffect(() => {
    fetch(`${fetchUrl}/tic_tac_toe_match_data?match_id=${matchId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.match.game_status);
        const fetchBoard = JSON.parse(data.match.game_status).board
        if (turn_count(fetchBoard) == 0) {
          setCurrentSide("X");
          setBoard(fetchBoard);
        } else {
          fetchBoard.forEach((v, i) => {
            // console.log(i, v)
            if (v != " ") {
              fieldRefs[i].current.textContent = v;
              v == "X"
                ? (fieldRefs[i].current.style.color = "red")
                : (fieldRefs[i].current.style.color = "blue");
              fieldRefs[i].current.parentNode.style.transform = "rotateY(180deg)";
              fieldRefs[i].current.parentNode.style.pointerEvents = "none";
            }
          })
          setCurrentSide(data.history.player == "X" ? "O" : "X");
          setBoard(fetchBoard)
        }
        // console.log(data);
        // console.log(JSON.parse(data.match.game_settings));
        setGameSettings(JSON.parse(data.match.game_settings))
        if (data.match.finished === false) {
          checkWinner(fetchBoard)
        } else {
          setGameFinished(true)
        }
      });
  }, []);

  // get latest game history every second and update the board
  useEffect(() => {
    const id = setInterval(() => {
      fetch(`${fetchUrl}/tic_tac_toe_match_last_history/${matchId}`)
      .then(res => res.json())
      .then(history => {
        if (history) {
          if (board[history.position] != history.player) {
            // console.log(history)
            fieldRefs[history.position].current.textContent = history.player;
            history.player == "X"
              ? (fieldRefs[history.position].current.style.color = "red")
              : (fieldRefs[history.position].current.style.color = "blue");
            fieldRefs[history.position].current.parentNode.style.transform = "rotateY(180deg)";
            fieldRefs[history.position].current.parentNode.style.pointerEvents = "none";
            board[history.position] = history.player
            if (checkWinner(board)) {
              setGameFinished(true)
              setBoard(board)
            } else {
              setCurrentSide(history.player == "X" ? "O" : "X");
              setBoard(board)
            }
          }
        }
      })
    }, 1000)
    setIntervalId(id)

    return (() => clearInterval(id))
  }, [])

  // to disable board if not current player
  useEffect(() => {
    if (gameSettings[currentSide]) {
      if (gameSettings[currentSide][0] == currentUser.id) {
        boardRef.current.style.pointerEvents = "auto"
      } else {
        boardRef.current.style.pointerEvents = "none"
      }
    }
  }, [currentSide])

  useEffect(() => {
    // if game is finished, no more need to fetching or access to the board
    if (gameFinished && boardRef) {
      clearInterval(intervalId)
      boardRef.current.style.pointerEvents = "none";
    }
  }, [gameFinished])


  // console.log(board)
  // if (gameSettings[currentSide]) {
  //   console.log(gameSettings[currentSide][1])
  //   console.log(gameSettings[currentSide === "X" ? "O" : "X"][1])
  // }
  // console.log(currentSide)
  // console.log(gameFinished)
  // console.log(intervalId)

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

  function turn_count(board) {
    return board.filter((index) => index != " ").length;
  }

  function won(board) {
    let win = false;
    winCombinations.forEach((combo) => {
      if (
        board[combo[0]] != " " &&
        board[combo[0]] == board[combo[1]] &&
        board[combo[1]] == board[combo[2]]
      ) {
        win = board[combo[0]];
        console.log(intervalId)
        clearInterval(intervalId)
        if (gameSettings[win][0] == currentUser.id) {
          if (!gameFinished) {
            setTimeout(() => {
              showAlert({ type: "winner", message: "You win!" });
            }, 1000);
          }
        } else {
          if (!gameFinished) {
            setTimeout(() => {
              showAlert({ type: "alert", message: "You lose!" });
            }, 1000);
          }
        }
      }
    });
    return win;
  }

  function full(board) {
    return board.filter((index) => index == " ").length == 0 ? !won(board) : false;
  }

  function draw(board) {
    return full(board) && !won(board);
  }

  function over(board) {
    return draw(board) || won(board);
  }

  function checkWinner(board) {
    let winner = false
    if (over(board)) {
      if (draw(board)) {
        winner = "Draw"
        if (!gameFinished) {
          setTimeout(() => {
            showAlert({ type: "alert", message: "Draw!" });
          }, 1000);
        }
      } else if (won(board)) {
        winner = won(board)
        boardRef.current.style.pointerEvents = "none";
      }
      return true
    } else {
      console.log("continue");
      return false
    }
  }

  // ---------------------------------------------------------------------------------

  function play(e, index, currentSide) {
    move(index, currentSide);
    let playObj = {
      player: currentSide,
      position: index,
      user_id: currentUser.id,
      match_id: matchId,
      game_status: JSON.stringify({ board: board }),
    };

    // post data on player move
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
    if (checkWinner(board)) {
      fetch(`${fetchUrl}/tic_tac_toe_finished/${matchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          finished: true
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      setGameFinished(true)
    } else {
      setCurrentSide((currentSide) => (currentSide == "X" ? "O" : "X"));
    }
  }

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.currentPlayer}>
        {
          gameFinished ? (
            <div className={styles.gameResult} onClick={() => navigate("/")}>
              <div>Game Finished</div>
              {
                (gameSettings[currentSide]) ? (
                  <div>
                    {
                      draw(board) ? (
                        "Draw"
                      ) : (
                        `${gameSettings[won(board)][1]} Won!`
                      )
                    }
                  </div>
                ) : (
                  null
                )
              }
            </div>
          ) : (
            <>
              <div className={styles.currentPlayerName}>
                {
                  gameSettings[currentSide] ? (
                    gameSettings[currentSide][0] === currentUser.id ? (
                      <div>Your Turn</div>
                    ) : (
                      <div>
                        {gameSettings[currentSide === "X" ? "X" : "O"][1]}'s Turn
                      </div>
                    )
                  ) : (
                    null
                  )
                }
              </div>
              <div className={styles.currentPlayerSide}>
                {
                  currentSide === "X" ? (
                    <div style={{color: "red"}}>{currentSide}</div>
                  ) : (
                    <div style={{color: "blue"}}>{currentSide}</div>
                  )
                }
              </div>
            </>
          )
        }
      </div>
      <div className={styles.gamePlayground}>
        <div className={styles.tttContainer} ref={boardRef}>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 0, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[0]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 1, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[1]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 2, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[2]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 3, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[3]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 4, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[4]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 5, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[5]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 6, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[6]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 7, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[7]}></div>
            </div>
          </div>
          <div className={styles.item}>
            <div
              className={styles.front}
              onClick={(e) => play(e, 8, currentSide)}
            >
              <div className={styles.back} ref={fieldRefs[8]}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
