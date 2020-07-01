document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#score");
  const width = 8;
  const boardColors = [
    "url(images/blue-candy.png)",
    "url(images/green-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/red-candy.png)",
    "url(images/yellow-candy.png)",
  ];
  const squares = [];
  let score = 0;

  // create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      var square = document.createElement("div");
      square.setAttribute("id", i);
      square.setAttribute("draggable", true);
      var randomColor = Math.floor(Math.random() * boardColors.length);
      square.style.backgroundImage = boardColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  //Drag the squares
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    console.log(this.id, "dragStart");
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
  }
  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragEnter");
  }
  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragOver");
  }
  function dragLeave() {
    console.log(this.id, "dragLeave");
  }
  function dragDrop() {
    console.log(this.id, "dragDrop");
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }
  function dragEnd() {
    console.log(this.id, "dragEnd");
    //Check valid moves

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
      squareIdBeingDragged - width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }

    //drop blocks after it gets cleared
    function moveDown() {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

      for (let i = 0; i < 63; i++) {
        var isFirstRow = firstRow.includes(i);
        if (squares[i].style.backgroundImage === "" && isFirstRow) {
          var randomColor = Math.floor(Math.random() * boardColors.length);
          squares[i].style.backgroundImage = boardColors[randomColor];
        } else if (squares[i].style.backgroundImage === "" && !isFirstRow) {
          squares[i].style.backgroundImage =
            squares[i - width].style.backgroundImage;
          squares[i - width].style.backgroundImage = "";
        } else {
        }
      }
    }
    //check for row of Three
    function rowOfThree() {
      for (let i = 0; i < 61; i++) {
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
        if (notValid.includes(i)) continue;
        decidedColor = squares[i].style.backgroundImage;
        decidedColor2 = squares[i + 1].style.backgroundImage;
        decidedColor3 = squares[i + 2].style.backgroundImage;

        if (
          decidedColor !== "" &&
          decidedColor === decidedColor2 &&
          decidedColor2 === decidedColor3 &&
          decidedColor3 === decidedColor
        ) {
          score += 3;
          resultDisplay.innerHTML = score;
          squares[i].style.backgroundImage = "";
          squares[i + 1].style.backgroundImage = "";
          squares[i + 2].style.backgroundImage = "";
        }
      }
    }
    //check for column of three
    function columnOfThree() {
      for (let i = 0; i < 47; i++) {
        decidedColor = squares[i].style.backgroundImage;
        decidedColor2 = squares[i + width].style.backgroundImage;
        decidedColor3 = squares[i + width * 2].style.backgroundImage;

        if (
          decidedColor !== "" &&
          decidedColor === decidedColor2 &&
          decidedColor2 === decidedColor3 &&
          decidedColor3 === decidedColor
        ) {
          score += 3;
          resultDisplay.innerHTML = score;
          squares[i].style.backgroundImage = "";
          squares[i + width].style.backgroundImage = "";
          squares[i + width * 2].style.backgroundImage = "";
        }
      }
    }

    window.setInterval(function () {
      moveDown();
      rowOfThree();
      columnOfThree();
    }, 100);
  }
});
