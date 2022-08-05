import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./TicTacToeMid.module.css";
import { fetchUrl } from "../../../utilities/GlobalVariables";
import { useLocation, useNavigate } from "react-router-dom";

function TicTacToe({ ticTacToePackage }) {
  const { currentUser, showWinLose } = ticTacToePackage;
  const [board, setBoard] = useState(Array(25).fill(" "));
  const [gameSettings, setGameSettings] = useState({"X":[0,""],"O":[0,""]});
  const [currentSide, setCurrentSide] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [gameContinue, setGameContinue] = useState(false);
  const [replay, setReplay] = useState(false)
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
  const fieldRef9 = useRef();
  const fieldRef10 = useRef();
  const fieldRef11 = useRef();
  const fieldRef12 = useRef();
  const fieldRef13 = useRef();
  const fieldRef14 = useRef();
  const fieldRef15 = useRef();
  const fieldRef16 = useRef();
  const fieldRef17 = useRef();
  const fieldRef18 = useRef();
  const fieldRef19 = useRef();
  const fieldRef20 = useRef();
  const fieldRef21 = useRef();
  const fieldRef22 = useRef();
  const fieldRef23 = useRef();
  const fieldRef24 = useRef();

  // const arr = [...Array(25).keys()]
  // arr.forEach(i => {
  //   fieldRefs.push(fieldRef`${i}` = useRef())
  // })
  const fieldRefs = [
    fieldRef0, fieldRef1, fieldRef2, fieldRef3, fieldRef4, 
    fieldRef5, fieldRef6, fieldRef7, fieldRef8, fieldRef9,
    fieldRef10, fieldRef11, fieldRef12, fieldRef13, fieldRef14,
    fieldRef15, fieldRef16, fieldRef17, fieldRef18, fieldRef19,
    fieldRef20, fieldRef21, fieldRef22, fieldRef23, fieldRef24
  ]

  useEffect(() => {
    fetch(`${fetchUrl}/tic_tac_toe_match_data?match_id=${matchId}&length=25`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.match.game_status);
        const fetchBoard = JSON.parse(data.match.game_status).board
        if (turn_count(fetchBoard) === 0) {
          setCurrentSide("X");
          setBoard(fetchBoard);
        } else {
          fetchBoard.forEach((v, i) => {
            // console.log(i, v)
            if (v != " ") {
              fieldRefs[i].current.textContent = v;
              v === "X"
                ? (fieldRefs[i].current.style.color = "red")
                : (fieldRefs[i].current.style.color = "blue");
              fieldRefs[i].current.parentNode.style.transform = "rotateY(180deg)";
              fieldRefs[i].current.parentNode.style.pointerEvents = "none";
            }
          })
          setCurrentSide(data.history.player === "X" ? "O" : "X");
          console.log(fetchBoard)
          setBoard(fetchBoard)
        }
        // console.log(data);
        // console.log(JSON.parse(data.match.game_settings));
        setGameSettings(JSON.parse(data.match.game_settings))
        if (data.match.finished) {
          setGameFinished(true)
        } else {
          setGameContinue(true)
        }
      });
  }, []);

  // get latest game history every second and update the board
  useEffect(() => {
    let id = 0
    if (gameContinue) {
      id = setInterval(() => {
        fetch(`${fetchUrl}/tic_tac_toe_match_last_history/${matchId}`)
        .then(res => res.json())
        .then(history => {
          if (history) {
            // console.log(history)
            console.log(board)
            if (board[history.position] != history.player) {
              fieldRefs[history.position].current.textContent = history.player;
              history.player === "X"
                ? (fieldRefs[history.position].current.style.color = "red")
                : (fieldRefs[history.position].current.style.color = "blue");
              fieldRefs[history.position].current.parentNode.style.transform = "rotateY(180deg)";
              fieldRefs[history.position].current.parentNode.style.pointerEvents = "none";
              board[history.position] = history.player
              if (checkWinner(board)) {
                setGameFinished(true)
                setBoard(board)
              } else {
                setCurrentSide(history.player === "X" ? "O" : "X");
                setBoard(board)
              }
            }
          }
        })
      }, 1000)
    }
    setIntervalId(id)

    return (() => clearInterval(id))
  }, [gameContinue])

  // to disable board if not current player
  useEffect(() => {
    if (gameSettings[currentSide]) {
      if (gameSettings[currentSide][0] === currentUser.id) {
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

  console.log("==========")
  console.log(board)
  // if (gameSettings[currentSide]) {
  //   console.log(gameSettings[currentSide][1])
  //   console.log(gameSettings[currentSide === "X" ? "O" : "X"][1])
  // }
  // console.log(currentSide)
  console.log(gameFinished)
  // console.log(intervalId)
  console.log("XXXXXXXXXX")

  // --------------------------- tic tac toe logics -----------------------------
  const winCombinations = [
    [0, 1, 2, 3], [1, 2, 3, 4],
    [5, 6, 7, 8], [6, 7, 8 ,9],
    [10, 11, 12, 13], [11, 12, 13, 14],
    [15, 16, 17, 18], [16, 17, 18, 19],
    [20, 21, 22, 23], [21, 22, 23, 24],
    [0, 5, 10, 15], [5, 10, 15, 20],
    [1, 6, 11, 16], [6, 11, 16, 21],
    [2, 7, 12, 17], [7, 12, 17, 22],
    [3, 8, 13, 18], [8, 13, 18, 23],
    [4, 9, 14, 19], [9, 14, 19, 24],
    [0, 6, 12, 18], [6, 12, 18, 24],
    [4, 8, 12, 16], [8, 12, 16, 20],
    [1, 7, 13, 19], [5, 11, 17, 23],
    [3, 7, 11, 15], [9, 13, 17, 21],
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
        board[combo[0]] !== " " &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]] &&
        board[combo[2]] === board[combo[3]]
      ) {
        win = board[combo[0]];
        clearInterval(intervalId)
        if (gameSettings[win][0] === currentUser.id) {
          if (!gameFinished) {
            setTimeout(() => {
              showWinLose({ type: "win", message: "You Win!" });
            }, 1000);
          }
        } else {
          if (!gameFinished) {
            setTimeout(() => {
              showWinLose({ type: "lose", message: "You Lose!" });
            }, 1000);
          }
        }
      }
    });
    return win;
  }

  function full(board) {
    return board.filter((index) => index === " ").length === 0 ? !won(board) : false;
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
            showWinLose({ type: "draw", message: "Draw!" });
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
    currentSide === "X"
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
      setCurrentSide((currentSide) => (currentSide === "X" ? "O" : "X"));
    }
  }

  const arr = [...Array(25).keys()]
  const boardFields = arr.map(i => {
    return (
      <div key={i} className={styles.item}>
        <div
          className={styles.front}
          onClick={(e) => play(e, i, currentSide)}
        >
          <div className={styles.back} ref={fieldRefs[i]}></div>
        </div>
      </div>
    )
  })

  const winner = won(board)

  return (
    <div className={styles.mainPageContainer}>
      <div id={styles.backBtn} onClick={() => navigate("/match-making/1")}>
        <img src="https://img.icons8.com/officel/80/000000/return.png" alt="return button"/>
      </div>
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
                        <div className={styles.winnerInfo}>
                          <div>{gameSettings[winner][1]}</div>
                          <div className={styles.winnerSide} style={winner == "X" ? {color: "red"} : {color: "blue"}}>{winner}</div>
                          <div>Won!</div>
                        </div>
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
          {boardFields}
        </div>
      </div>
      {
        !gameFinished ? (
          gameSettings[currentSide] ? (
            <div className={styles.instruction}>
              Connect 4 <div style={gameSettings["X"][0] == currentUser.id ? {color: "red"} : {color: "blue"}}>{gameSettings["X"][0] == currentUser.id ? "X" : "O"}</div> to win.
            </div>
          ) : (
            null
          )
        ) : (
          !replay ? (
            <div className={styles.replay} onClick={() => setReplay(true)} style={{cursor: "pointer"}}>
              <img src="https://img.icons8.com/color/96/000000/replay--v1.png"/>
              <h1>Replay</h1>
            </div>
          ) : (
            <div className={styles.replay}>
              <h1>Replaying...</h1>
            </div>
          )
        )
      }
    </div>
  );
}

export default TicTacToe;
