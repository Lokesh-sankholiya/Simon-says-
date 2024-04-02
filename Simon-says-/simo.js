let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "blue"];
let started = false;
let level = 0;
let startButton = document.getElementById("startButton");

document.addEventListener("DOMContentLoaded", function () {
  startButton.addEventListener("click", function () {
    startGame();
  });
});

function startGame() {
  if (!started) {
    console.log("Game is started");
    started = true;
    levelup();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelup() {
  userSeq = [];
  level++;
  if (startButton) {
    startButton.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
  } else {
    console.error("Error: Unable to find <startButton> element.");
  }
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    startButton.innerHTML = `Game Over..! Your Score was <b>${level}</b> <br>Press Any Key To Start Again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
