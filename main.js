const digits = document.querySelectorAll('.digit');
const screen = document.querySelector('.screen');
const controls = document.querySelectorAll('.control');

let previousNumber;
let operator;
let reset = false;

digits.forEach((digit) => {
  digit.addEventListener('click', addNumber);
});
controls.forEach((control) => {
  control.addEventListener('click', handleControl);
});

let screenContent = '0';
updateScreen();

function addNumber(e) {
  const number =
    e.currentTarget.textContent !== ',' ? +e.currentTarget.textContent : '.';
  const SCREEN_LIMIT = 12;
  if (reset) {
    screenContent = '';
    screenContent += '' + number;
    updateScreen();
    reset = false;
    return;
  }
  if (screenContent.length >= SCREEN_LIMIT) {
    return;
  }

  if (number === 0 && screenContent === '0') {
    return;
  }
  if (screenContent === '0') {
    if (number !== '.') {
      screenContent = '';
    }
    screenContent += '' + number;
    updateScreen();
    return;
  }
  screenContent += '' + number;
  updateScreen();
}

function updateScreen(forcedValue) {
  if (forcedValue) {
    screenContent = forcedValue;
  }
  screen.textContent = screenContent;
}

function add(num1, num2) {
  const result = +num1 + +num2;
  return parseFloat(result.toFixed(12));
}
function subtract(num1, num2) {
  const result = +num1 - +num2;
  return parseFloat(result.toFixed(12));
}
function multiply(num1, num2) {
  const result = +num1 * +num2;
  return parseFloat(result.toFixed(12));
}
function divide(num1, num2) {
  const result = +num1 / +num2;
  return parseFloat(result.toFixed(12));
}

function operate(num1, num2, operator) {
  let result = 0;
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
  }
  console.log(num1, operator, num2, '=', result);
  return result;
}

function handleControl(e) {
  const pressed = e.currentTarget.textContent;
  if (pressed !== '=') {
    if (!operator) {
      operator = e.currentTarget.textContent;
    }
  }
  if (!previousNumber) {
    if (pressed === '=') {
      return;
    }
    previousNumber = screenContent;
    reset = true;
    return;
  }
  updateScreen(operate(previousNumber, screenContent, operator));
  if (pressed === '=') {
    operator = null;
    previousNumber = null;
    return;
  }
  operator = pressed;
  previousNumber = screenContent;
  reset = true;
}
