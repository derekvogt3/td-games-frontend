import React from "react";
import { useState, useEffect } from "react";
import styles from "./TicTacToe.module.css";

function TicTacToe({ currentUser }) {
  const [boardGame, setboardGame] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
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
    </>
  );
}

export default TicTacToe;
