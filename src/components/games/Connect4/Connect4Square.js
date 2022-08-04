import React from "react";

export default function Connect4Square({
  setboard,
  rowIdx,
  colIdx,
  val,
  currentPlayer,
  board,
  setCurrentPlayer,
  setisWinner,
}) {
  function handleOnClick() {
    turn();
  }

  function isWinner(row, col) {
    let counter = 1;

    let checkArray = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
    ];

    checkArray.forEach((val) => {
      recursiveCheck(counter, row, col, val[0], val[1]);
    });
  }

  function recursiveCheck(counter, row, col, checkArrayRow, checkArrayCol) {
    let secondCounter = 0;
    if (counter === 4) {
      setisWinner(true);
      return true;
    }

    let newRow = row + checkArrayRow;
    let newCol = col + checkArrayCol;

    if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7) {
      if (board[newRow][newCol] === currentPlayer) {
        counter += 1;
        recursiveCheck(counter, newRow, newCol, checkArrayRow, checkArrayCol);
      } else {
        revRecursionCheck(
          secondCounter,
          newRow,
          newCol,
          checkArrayRow,
          checkArrayCol
        );
      }
    }

    return false;
  }

  function revRecursionCheck(counter, row, col, checkArrayRow, checkArrayCol) {
    if (counter === 4) {
      setisWinner(true);
      return true;
    }

    let newRow = row - checkArrayRow;
    let newCol = col - checkArrayCol;

    if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7) {
      if (board[newRow][newCol] === currentPlayer) {
        counter += 1;
        revRecursionCheck(
          counter,
          newRow,
          newCol,
          checkArrayRow,
          checkArrayCol
        );
      }
    }

    return false;
  }

  function turn() {
    for (let i = 5; i >= 0; --i) {
      if (board[i][colIdx] === "") {
        setboard((board) => {
          board[i][colIdx] = currentPlayer;
          return board;
        });

        if (currentPlayer === "X") {
          setCurrentPlayer("O");
        } else {
          setCurrentPlayer("X");
        }
        isWinner(i, colIdx);

        return;
      }
    }
    console.log("cant go here");
  }

  return (
    <div className="cf-item" onClick={handleOnClick}>
      {board[rowIdx][colIdx]}
    </div>
  );
}
