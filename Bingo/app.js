// Array to store picked numbers
var pickedNumbers = [];
var MaxNumber = 0;
var numberDisplay = document.getElementById("number-display");
var drums = document.getElementById("audioDrums");
var pop = document.getElementById("audioPop");
var isClickable = true;
var roll = document.querySelector("#buzzer");
roll.classList.add("roll-btn-hide");
function startGame() {
  MaxNumber = document.getElementById("max").value;
  for (let i = 1; i < parseInt(MaxNumber) + 1; i++) {
    var numberList = document.getElementById("number-list");
    var numberElement = document.createElement("div");
    numberElement.className = "number";
    numberElement.textContent = i;
    numberList.appendChild(numberElement);
  }
  document.getElementById("rules").classList.add("roll-btn-hide");
  roll.classList.remove("roll-btn-hide");
  roll.classList.add("roll-btn-show");
}
// Generate a random number between 1 and MaxNumber
function generateRandomNumber() {
  return Math.floor(Math.random() * MaxNumber) + 1;
}

// Generate a new number and display it
function generateNumber() {
  if (!isClickable) {
    return;
  }
  isClickable = false;
  drums.play();

  roll.src = "images/BTNPRESSED.png";
  document.querySelector("*").style.cursor = "wait";
  // roll.classList.remove("roll-btn-show");
  // roll.classList.add("roll-btn-hide");
  numberDisplay.classList.add("show");
  document.querySelector(".reset").disabled = true;
  // Check if all numbers have been picked

  // Disable generate number button during animation
  var generateButton = document.querySelector("button");
  generateButton.disabled = true;

  // Start displaying random numbers
  var startTime = Date.now();
  var interval = setInterval(function () {
    // Generate a new random number
    var number = generateRandomNumber();

    // Check if the number has already been picked
    if (pickedNumbers.includes(number)) {
      return;
    }
    // Display the number
    numberDisplay.textContent = number;
  }, 70); // Display a new number every x second
  // Stop displaying random numbers after 5 seconds
  setTimeout(function () {
    clearInterval(interval);

    // Generate a new number
    if (pickedNumbers.length === MaxNumber - 1) {
      alert("All numbers have been picked!");
      return;
    }
    var number = generateRandomNumber();

    // Check if the number has already been picked
    if (pickedNumbers.includes(number)) {
      generateNumber(); // Generate another number if already picked
      return;
    }
    // Add the number to the picked numbers array
    pickedNumbers.push(number);
    numberDisplay.textContent = number;
    var pickedNumber = document.querySelectorAll(".number");
    pickedNumber[number - 1].classList.add("selected");
    // Enable generate number button after displaying chosen number
    generateButton.disabled = false;
    document.querySelector(".reset").disabled = false;
    roll.classList.remove("roll-btn-hide");
    roll.classList.add("roll-btn-show");
    numberDisplay.classList.remove("show");
    pop.play();
    roll.src = "images/BTN.png";
    document.querySelector("*").style.cursor = "default";
    isClickable = true;
  }, 5000);
}

// Reset the game
function resetGame() {
  roll.classList.add("roll-btn-hide");
  document.getElementById("rules").classList.remove("roll-btn-hide");
  document.getElementById("rules").classList.add("roll-btn-show");

  // Clear the picked numbers array
  pickedNumbers = [];

  // Clear the number display
  numberDisplay.textContent = "";

  // Clear the picked numbers list
  var numberList = document.getElementById("number-list");
  numberList.innerHTML = "";
}

// cursour animation

// create instance of kinet with custom settings
var kinet = new Kinet({
  acceleration: 0.1,
  friction: 0.15,
  names: ["x", "y"],
});

// select circle element
var circle = document.getElementById("circle");

// set handler on kinet tick event
kinet.on("tick", function (instances) {
  circle.style.transform = `translate3d(${instances.x.current}px, ${
    instances.y.current
  }px, 0) rotateX(${instances.x.velocity / 2}deg) rotateY(${
    instances.y.velocity / 2
  }deg)`;
});

