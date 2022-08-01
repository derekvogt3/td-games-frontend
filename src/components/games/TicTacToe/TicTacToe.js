import React from "react";
import { useState, useEffect } from "react";
import styles from "./TicTacToe.module.css";
import InviteFriend from "../InviteFriend";

function TicTacToe({ currentUser }) {
  useEffect(() => {
    console.log(currentUser + "test");
  }, []);

  const [boardGame, setboardGame] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInvite, setShowInvite] = useState(true);

  return (
    <>
      {gameStarted ? (
        <div className={styles.mainPageContainer}>
          <div className={styles.tttContainer}>
            <div className={styles.item}></div>

            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
          </div>
        </div>
      ) : (
        <>
          <div>Start a New Game</div>
          <button>Invite a Friend</button>
          {showInvite ? <InviteFriend currentUser={currentUser} /> : <></>}
        </>
      )}
    </>
  );
}

export default TicTacToe;
