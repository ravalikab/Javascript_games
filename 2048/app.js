document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const squares = [];
  let score = 0;
  //create board

  function createBoard() {
    for (let i = 0; i < 16; i++) {
      var square = document.createElement("div");
      square.innerHTML = 0;
      grid.appendChild(square);
      squares.push(square);
    }
    generateNum();
    generateNum();
  }
  createBoard();

  //Generate random number
  function generateNum() {
    var randomNum = Math.floor(Math.random() * 16);
    //  console.log(randomNum);
    for (let i = 0; i < 16; i++) {
      if (squares[i].innerHTML == 0) squares[i].innerHTML = null;
    }
    if (squares[randomNum].innerHTML == 0) {
      squares[randomNum].innerHTML = 2;
    } else generateNum();

    checkGameOver();
  }

  // move to Right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let row1 = squares[i].innerHTML;
        let row2 = squares[i + 1].innerHTML;
        let row3 = squares[i + 2].innerHTML;
        let row4 = squares[i + 3].innerHTML;

        var row = [
          parseInt(row1),
          parseInt(row2),
          parseInt(row3),
          parseInt(row4),
        ];

        let numberInRow = row.filter((num) => num);

        let missing = 4 - numberInRow.length;
        let zeroes = Array(missing).fill(0);
        let newRow = zeroes.concat(numberInRow);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }
  // Move to Left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let row1 = squares[i].innerHTML;
        let row2 = squares[i + 1].innerHTML;
        let row3 = squares[i + 2].innerHTML;
        let row4 = squares[i + 3].innerHTML;

        var row = [
          parseInt(row1),
          parseInt(row2),
          parseInt(row3),
          parseInt(row4),
        ];

        let numberInRow = row.filter((num) => num);

        let missing = 4 - numberInRow.length;
        let zeroes = Array(missing).fill(0);
        let newRow = numberInRow.concat(zeroes);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Move Down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column1 = squares[i].innerHTML;
      let column2 = squares[i + 4].innerHTML;
      let column3 = squares[i + 8].innerHTML;
      let column4 = squares[i + 12].innerHTML;
      var column = [
        parseInt(column1),
        parseInt(column2),
        parseInt(column3),
        parseInt(column4),
      ];

      let numberInColumn = column.filter((num) => num);

      let missing = 4 - numberInColumn.length;
      let zeroes = Array(missing).fill(0);
      let newColumn = zeroes.concat(numberInColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + 4].innerHTML = newColumn[1];
      squares[i + 8].innerHTML = newColumn[2];
      squares[i + 12].innerHTML = newColumn[3];
    }
  }
  // Move Up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column1 = squares[i].innerHTML;
      let column2 = squares[i + 4].innerHTML;
      let column3 = squares[i + 8].innerHTML;
      let column4 = squares[i + 12].innerHTML;
      var column = [
        parseInt(column1),
        parseInt(column2),
        parseInt(column3),
        parseInt(column4),
      ];

      let numberInColumn = column.filter((num) => num);

      let missing = 4 - numberInColumn.length;
      let zeroes = Array(missing).fill(0);
      let newColumn = numberInColumn.concat(zeroes);
      squares[i].innerHTML = newColumn[0];
      squares[i + 4].innerHTML = newColumn[1];
      squares[i + 8].innerHTML = newColumn[2];
      squares[i + 12].innerHTML = newColumn[3];
      console.log(newColumn);
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        squares[i + 1].innerHTML =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = 0;
        score +=
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        scoreDisplay.innerHTML = score;
      }
    }
    checkWin();
  }
  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + 4].innerHTML) {
        squares[i].innerHTML =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
        squares[i + 4].innerHTML = 0;
        score +=
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        scoreDisplay.innerHTML = score;
      }
    }
    checkWin();
  }
  function control(e) {
    if (e.keyCode === 39) keyRight();
    else if (e.keyCode === 37) keyLeft();
    else if (e.keyCode === 38) keyUp();
    else if (e.keyCode === 40) keyDown();
    else {
    }
  }
  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateNum();
  }
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateNum();
  }
  function keyUp() {
    moveUp();
    console.log("##############");
    combineColumn();
    moveUp();
    generateNum();
  }
  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generateNum();
  }

  //check for win
  function checkWin() {
    for (let i = 0; i < 16; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You won";
        document.removeEventListener("keyup", control);
      }
    }
  }

  //check for game over
  function checkGameOver() {
    let value = 0;
    for (let i = 0; i < 16; i++) {
      if (squares[i].innerHTML != 0) value++;
    }
    if (value == 16) {
      resultDisplay.innerHTML = "You Lose";
      document.removeEventListener("keyup", control);
    }
  }

  document.addEventListener("keyup", control);
});
