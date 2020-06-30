document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".box");
  //const player = document.querySelector("#player");

  var currentPlayer = "playerX";
  var filled = 0;
  //   var selectedX = [];
  // var selectedO = [];
  var blocksAdded = [];

  cards.forEach((card, index) => {
    card.setAttribute("data-index", index);
    card.addEventListener("click", add);
  });

  function add(e) {
    const card = e.target;
    // console.log(card);
    var value = this.getAttribute("data-index");
    if (currentPlayer === "playerX") {
      card.classList.add("playerX");
      blocksAdded.push({
        selected: parseInt(value),
        player: currentPlayer,
      });
      currentPlayer = "playerO";
    } else {
      card.classList.add("playerO");
      blocksAdded.push({
        selected: parseInt(value),
        player: currentPlayer,
      });
      currentPlayer = "playerX";
    }
    filled++;
    if (filled > 4) {
      var selectedX = blocksAdded
        .filter((filt) => filt.player === "playerX")
        .map((ma) => ma.selected);
      var selectedO = blocksAdded
        .filter((fill) => fill.player === "playerO")
        .map((va) => va.selected);
      console.log(selectedO);
      console.log(selectedX);

      const rightAnswers = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      rightAnswers.forEach((answer) => {
        if (filled % 2 != 0) {
          const mappedPos = answer.filter((pos) => selectedX.includes(pos));
          if (mappedPos.length === 3) {
            alert("playerX Wins");
          }
        } else {
          const mappedPos = answer.filter((pos) => selectedO.includes(pos));
          if (mappedPos.length === 3) {
            alert("PlayerO Wins");
          }
        }
      });
    }
  }
});
