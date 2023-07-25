let durtion = 700;
let showDurtion = 6000;
let counter;
let timeOfCounter = 90;
//To receive name from user
document.querySelector(".start-buttens span").onclick = function () {
  let spanOfName = document.querySelector(".head .name span");
  let inputForm = document.createElement("form");
  inputForm.classList.add("form");

  let inputlabel = document.createElement("label");
  let textLabel = document.createTextNode("Enter Your Name");
  inputlabel.classList.add("label");
  inputlabel.append(textLabel);

  let inputfield = document.createElement("input");
  inputfield.classList.add("field");

  let submit = document.createElement("button");
  let textSubmit = document.createTextNode("Submit");
  submit.classList.add("submit");
  submit.setAttribute("type", "button");
  submit.onclick = function () {
    let x = inputfield.value;

    //to check if User Enter value or not
    if (x == null || x == "") {
      spanOfName.innerHTML = "Unknown";
    } else {
      spanOfName.innerHTML = x;
    }
    document.querySelector(".start-buttens").remove();
    inputForm.remove();
  };
  submit.append(textSubmit);

  inputForm.append(inputlabel);
  inputForm.append(inputfield);
  inputForm.append(submit);

  document.body.appendChild(inputForm);

  //to when click on submit show all cards
  submit.addEventListener("click", () => {
    showall();
  });
};

// make order range for cards

let allBlocks = document.querySelector(".all-blocks");
let blocks = Array.from(allBlocks.children);
let orderRange = [...blocks.keys()];

//function to show all cards before starting
function showall() {
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
  });

  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("is-flipped");
    });
    timer();
  }, showDurtion);
}

//funtion to control the timer
function timer() {
  let timer = document.querySelector(".timer span");
  timer.innerHTML = timeOfCounter;
  counter = setInterval(() => {
    timer.innerHTML = parseInt(timer.innerHTML) - 1;
    if (timer.innerHTML == 0) {
      clearInterval(counter);
      gameOver();
      bottomClose();
      bottomPlayAgain();
    }
  }, 1000);
}

//function to genarute random array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffle(orderRange);

//add order range to blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  //to add event rotate if user clicked on card
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

//function to add class is-flipped to card
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  //to filter blocks to blocks had class is-flipped
  let flippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  //to check if flipped blocks are 2 items or not
  if (flippedBlocks.length === 2) {
    stopClicking();
    checkMatched(flippedBlocks);
  }
}

//function to stop clicking for 1sec
function stopClicking() {
  document.querySelector(".all-blocks").classList.add("stop-clicking");

  setTimeout(() => {
    document.querySelector(".all-blocks").classList.remove("stop-clicking");
  }, durtion);
}

//function to check matched between two cards
function checkMatched(flippedBlocks) {
  let tries = document.querySelector(".tries span");

  if (flippedBlocks[0].dataset.photo === flippedBlocks[1].dataset.photo) {
    flippedBlocks[0].classList.remove("is-flipped");
    flippedBlocks[1].classList.remove("is-flipped");

    flippedBlocks[0].classList.add("correct");
    flippedBlocks[1].classList.add("correct");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      flippedBlocks[0].classList.remove("is-flipped");
      flippedBlocks[1].classList.remove("is-flipped");
    }, durtion);
  }
  playerWins();
}

//function to end game when player wins
function playerWins() {
  let done = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].classList.contains("correct")) {
      done++;
    }
  }
  if (done == blocks.length) {
    clearInterval(counter);
    win();
    bottomClose();
    bottomPlayAgain();
  }
}

//function to show popup fail
function gameOver() {
  let div = document.createElement("div");
  let text = document.createTextNode("LOSER");
  div.appendChild(text);
  document.body.appendChild(div);
  div.classList.add("popup-fail");
  document.querySelector(".all-blocks").classList.add("stop-clicking");
}

//bottom play again
function bottomPlayAgain() {
  let bottom = document.createElement("span");
  let text = document.createTextNode("Play Again");
  bottom.appendChild(text);
  document.body.appendChild(bottom);
  bottom.classList.add("bottomPLayAgain");
  bottom.addEventListener("click", () => {
    location.reload();
  });
}

//bottom close
function bottomClose() {
  let bottom = document.createElement("span");
  let text = document.createTextNode("close");
  bottom.appendChild(text);
  document.body.appendChild(bottom);
  bottom.classList.add("bottomClose");
  bottom.addEventListener("click", () => {
    window.close();
  });
}

//player is win
function win() {
  let div = document.createElement("div");
  let text = document.createTextNode("WINNER");
  div.appendChild(text);
  document.body.appendChild(div);
  div.classList.add("popup-success");
  document.querySelector(".all-blocks").classList.add("stop-clicking");
}
