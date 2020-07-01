document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "captain",
      img: "images/cap.png",
    },
    {
      name: "captain",
      img: "images/cap.png",
    },
    {
      name: "ironman",
      img: "images/ironman.png",
    },
    {
      name: "ironman",
      img: "images/ironman.png",
    },
    {
      name: "man",
      img: "images/man.png",
    },
    {
      name: "man",
      img: "images/man.png",
    },
    {
      name: "pokemon",
      img: "images/pokemon.png",
    },
    {
      name: "pokemon",
      img: "images/pokemon.png",
    },
    {
      name: "superman",
      img: "images/superman.png",
    },
    {
      name: "superman",
      img: "images/superman.png",
    },
    {
      name: "thor",
      img: "images/thor.png",
    },
    {
      name: "thor",
      img: "images/thor.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  var cardsChosen = [];
  var cardsChosenId = [];
  var cardsWon = [];

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "images/plain.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }
  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOne = cardsChosenId[0];
    const optionTwo = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cards[optionOne].setAttribute("src", "images/end.png");
      cards[optionTwo].setAttribute("src", "images/end.png");
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOne].setAttribute("src", "images/plain.png");
      cards[optionTwo].setAttribute("src", "images/plain.png");
      alert("Sorry, Try again");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulations";
    }
  }

  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length == 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  createBoard();
});
