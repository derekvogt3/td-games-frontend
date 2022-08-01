import React from "react";
import { useState } from "react";
import styles from "./TicTacToe.module.css";

function TicTacToe() {
  const [boardGame, setboardGame] = useState([]);

  return (
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
  );
}

export default TicTacToe;
