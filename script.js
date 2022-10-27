let operation = "";
let screen = document.querySelector(".screen");
let screen2 = document.querySelector(".second-screen");

screen.innerText = 0;
screen2.innerText = 0;

function addNumber(number) {
  screen.innerText === "0" ||
  screen.innerText === "Infinity" ||
  screen.innerText === "NaN" ||
  Number(screen.innerText) === NaN
    ? (screen.innerText = number)
    : (screen.innerText += number);
  window?.navigator?.vibrate?.(50);
}

function moveToSecondScreen(el) {
  el.classList.toggle("action-button-pressed");
  // in case screen.innerText is not a number
  if (isNaN(Number(screen.innerText))) screen.innerText = 0;
  screen2.innerText = Number(screen.innerText);
  screen.innerText = 0;
}

function selectOperation(el, op) {
  // add some haptic feedback
  window?.navigator?.vibrate?.(50);

  [...document.querySelectorAll(".action-button-pressed")].map((el) => {
    el.classList.remove("action-button-pressed");
  });

  switch (op) {
    case "add":
      operation = "add";
      moveToSecondScreen(el);
      break;
    case "sub":
      operation = "sub";
      moveToSecondScreen(el);
      break;
    case "mult":
      operation = "mult";
      moveToSecondScreen(el);
      break;
    case "div":
      operation = "div";
      moveToSecondScreen(el);
      break;
    case "eq":
      completeOperation();
      break;
    case "clear":
      screen.innerText = 0;
      screen2.innerText = 0;
      operation = "";
      break;
    case "sign":
      screen.innerText = Number(screen.innerText) * -1;
      break;
    case "help":
      // help modal
      break;
    case "pow":
      operation = "pow";
      moveToSecondScreen(el);
      break;
    case "sqrt":
      // check if the number is less than zero
      if (Number(screen.innerText) < 0) {
        screen.innerText = "Kvadratinė šaknis iš neigiamo skaičiaus.";
      } else {
        screen.innerText = Math.sqrt(Number(screen.innerText));
      }
      break;
    case "dot":
      // check if the number already includes a dot
      if (!screen.innerText.includes(".")) {
        screen.innerText += ".";
      }
      break;
    default:
      console.log("Operation can't be selected. Something went wrong.");
      break;
  }
}

function completeOperation() {
  // add some haptic feedback
  window?.navigator?.vibrate?.(50);

  let firstValue = Number(screen.innerText);
  let secondValue = Number(screen2.innerText);
  switch (operation) {
    case "add":
      screen.innerText = secondValue + firstValue;
      screen2.innerText = 0;
      operation = "";
      break;
    case "sub":
      screen.innerText = secondValue - firstValue;
      screen2.innerText = 0;
      operation = "";
      break;
    case "mult":
      screen.innerText = secondValue * firstValue;
      screen2.innerText = 0;
      operation = "";
      break;
    case "div":
      // check the division by zero
      if (Number(screen.innerText) === 0) {
        screen.innerText = "Dalyba iš nulio.";
      } else {
        screen.innerText = secondValue / firstValue;
      }
      screen2.innerText = 0;
      operation = "";
      break;
    case "pow":
      screen.innerText = Math.pow(secondValue, firstValue);
      screen2.innerText = 0;
      operation = "";
      break;
    default:
      console.log("Operation can't be completed. Something went wrong.");
      break;
  }
}
