import React from "react";
import { useState } from "react";
import styles from "../styles/TicTacToe.module.css";

function TicTacToe() {
  const [boardGame, setboardGame] = useState([]);

  return (
    <div className={styles.gridContainer}>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
      <h1 className={styles.item}>X</h1>
    </div>
  );
}

export default TicTacToe;
