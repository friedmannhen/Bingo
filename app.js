var pickedNumbers = [];
var MaxNumber = 0;
var numberDisplay = document.getElementById("number-display");
var anticipation = document.getElementById("anticipation");
var anticipation2 = document.getElementById("anticipation2");
var pop = document.getElementById("audioPop");
var winning = document.getElementById("winning");

var isClickable = false;
var roll = document.querySelector("#buzzer");
var rules = document.getElementById("rules");
var runningNumber = document.getElementById("runningNumber");
var rotateIcon = document.querySelector(".fa-arrows-rotate");
var muteIcon = document.querySelector("#mute");
var overlay = document.querySelector("#overlay");
var bingo = document.querySelector("#bingo");
var numberList = document.getElementById("number-list");
var randNumForAudio = 0;
rotateIcon.addEventListener("mouseover", function () {
  rotateIcon.classList.add("fa-spin");
});
rotateIcon.addEventListener("mouseout", function () {
  rotateIcon.classList.remove("fa-spin");
});
muteIcon.addEventListener("mouseover", function () {
  muteIcon.classList.add("fa-beat");
});
muteIcon.addEventListener("mouseout", function () {
  muteIcon.classList.remove("fa-beat");
});

roll.classList.add("roll-btn-hide");
function startGame() {
  isClickable = true;
  MaxNumber = document.getElementById("max").value;
  for (let i = 1; i < parseInt(MaxNumber) + 1; i++) {
    var numberElement = document.createElement("div");
    numberElement.className = "number";
    numberElement.textContent = i;
    numberList.appendChild(numberElement);
  }
  rules.classList.add("roll-btn-hide");
  roll.classList.remove("roll-btn-hide");
  roll.classList.add("roll-btn-show");
}
function generateRandomNumber() {
  return Math.floor(Math.random() * MaxNumber) + 1;
}

function generateNumber() {
  if (!isClickable) {
    return;
  }
  isClickable = false;

  roll.src = "images/BTNPRESSED.png";
  document.querySelector("*").style.cursor = "wait";
  numberDisplay.classList.add("show");
  document.querySelector("#reset").disabled = true;
  var generateButton = document.querySelector("button");
  generateButton.disabled = true;
  randNumForAudio = Math.floor( Math.random() * 100);
  console.log(randNumForAudio);
  if (randNumForAudio > 50) {
    anticipation.play();
  } else {
    anticipation2.play();
  }

  // Start displaying random numbers
  var startTime = Date.now();
  var interval = setInterval(function () {
    var number = generateRandomNumber();
    runningNumber.textContent = number;
  }, 70); 
  setTimeout(function () {
    clearInterval(interval);
    if (randNumForAudio > 50) {

      anticipation.pause();
      // console.log(anticipation.currentTime)
       if(anticipation.currentTime > 12) anticipation.currentTime= 0;
    } else {
      anticipation2.pause();
      // console.log(anticipation2.currentTime)

       if(anticipation2.currentTime > 20) anticipation2.currentTime= 0;
    }
    var number = generateRandomNumber();

    while (pickedNumbers.includes(number)) {
      number = generateRandomNumber();
    }
    if (pickedNumbers.length === MaxNumber - 1) {
      isClickable = false;
      roll.classList.remove("roll-btn-show");
      roll.classList.add("roll-btn-hide");
      document.querySelector("#reset").disabled = false;
      document.querySelector("*").style.cursor = "default";
      alert("All numbers have been picked!\npress reset to play again...");
    }
    pickedNumbers.push(number);
    runningNumber.textContent = number;
    var pickedNumber = document.querySelectorAll(".number");
    pickedNumber[number - 1].classList.add("selected");
    generateButton.disabled = false;
    document.querySelector("#reset").disabled = false;
    numberDisplay.classList.remove("show");
    pop.play();
    roll.src = "images/BTN.png";
    document.querySelector("*").style.cursor = "default";
    if (pickedNumbers.length != MaxNumber) isClickable = true;
  }, 4500);
}

function resetGame() {
  winning.pause();
  winning.currentTime = 0;
  roll.classList.add("roll-btn-hide");
  rules.classList.remove("roll-btn-hide");
  rules.classList.add("roll-btn-show");
  overlay.classList.remove("active");
  pickedNumbers = [];
  runningNumber.textContent = "";
  clearNumList();
  isClickable = false;
  console.log("Reset Complete");
}

function clearNumList() {
  var numberList = document.getElementById("number-list");
  var elements = numberList.getElementsByClassName("number");

  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "KeyW") {
    winning.play();
    overlay.classList.add("active");
    bingo.classList.remove("scale-active");
    setTimeout(function () {
      bingo.classList.add("scale-active");
    }, 10);
  }
});

document.addEventListener("keydown", function (event) {
  if (!isClickable) {
    return;
  }
  if (event.code === "Space") {
    generateNumber();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    winning.pause();
    winning.currentTime = 0;
    overlay.classList.remove("active");
    bingo.classList.remove("scale-active");

    setTimeout(function () {
      bingo.classList.add("scale-active");
    }, 10);
  }
});
var mutebtn = document.getElementById("mute");
function mute() {
  anticipation.muted = !anticipation.muted;
  anticipation2.muted = !anticipation2.muted;
  pop.muted = !pop.muted;
  winning.muted = !winning.muted;

  if (anticipation.muted && anticipation2.muted && pop.muted) {
    mutebtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    mutebtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
}
