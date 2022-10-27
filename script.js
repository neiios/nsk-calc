let operation = "";
let screen1 = document.querySelector(".screen");
let screen2 = document.querySelector(".second-screen");

screen1.innerText = 0;
screen2.innerText = 0;

function invalidInputCheck(tag) {
  return (
    tag.innerText === "0" ||
    Number(tag.innerText) === Infinity ||
    isNaN(Number(tag.innerText))
  );
}

function addNumber(number) {
  invalidInputCheck(screen1)
    ? (screen1.innerText = number)
    : (screen1.innerText += number);
  window?.navigator?.vibrate?.(50);
}

function moveToSecondScreen(el) {
  el.classList.toggle("action-button-pressed");
  // in case screen1.innerText is not a number
  if (invalidInputCheck(screen1)) screen1.innerText = 0;
  screen2.innerText = Number(screen1.innerText);
  screen1.innerText = 0;
}

function selectOperation(el, op) {
  // add some haptic feedback
  window?.navigator?.vibrate?.(50);

  [...document.querySelectorAll(".action-button-pressed")].map((el) => {
    el.classList.remove("action-button-pressed");
  });

  // in case screen1.innerText is not a number
  if (invalidInputCheck(screen1)) screen1.innerText = 0;

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
      screen1.innerText = 0;
      screen2.innerText = 0;
      operation = "";
      break;
    case "sign":
      screen1.innerText = Number(screen1.innerText) * -1;
      break;
    case "pow":
      operation = "pow";
      moveToSecondScreen(el);
      break;
    case "sqrt":
      // check if the number is less than zero
      if (Number(screen1.innerText) < 0) {
        screen1.innerText = "Kvadratinė šaknis iš neigiamo skaičiaus.";
      } else {
        screen1.innerText = Math.sqrt(Number(screen1.innerText));
      }
      break;
    case "dot":
      // check if the number already includes a dot
      if (!screen1.innerText.includes(".")) {
        screen1.innerText += ".";
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

  let firstValue = Number(screen1.innerText);
  let secondValue = Number(screen2.innerText);
  switch (operation) {
    case "add":
      screen1.innerText = secondValue + firstValue;
      screen2.innerText = 0;
      operation = "";
      break;
    case "sub":
      screen1.innerText = secondValue - firstValue;
      screen2.innerText = 0;
      operation = "";
      break;
    case "mult":
      screen1.innerText = secondValue * firstValue;
      screen2.innerText = 0;
      operation = "";
      break;
    case "div":
      // check the division by zero
      if (Number(screen1.innerText) === 0) {
        screen1.innerText = "Dalyba iš nulio.";
      } else {
        screen1.innerText = secondValue / firstValue;
      }
      screen2.innerText = 0;
      operation = "";
      break;
    case "pow":
      screen1.innerText = Math.pow(secondValue, firstValue);
      screen2.innerText = 0;
      operation = "";
      break;
    default:
      console.log("Operation can't be completed. Something went wrong.");
      break;
  }
}

const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});
