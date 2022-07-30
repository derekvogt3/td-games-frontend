import React from "react";
import { useState } from "react";
import styles from "../styles/TicTacToe.module.css";

function TicTacToe() {
  const [boardGame, setboardGame] = useState([]);

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.tttContainer}>
        <div className={styles.item}>
          <h1 className={styles.itemX}>X</h1>
        </div>
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
