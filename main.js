const digits = document.querySelectorAll('.digit');
const screen = document.querySelector('.screen-content');
const currentOperator = document.querySelector('.current-operator');
const controls = document.querySelectorAll('.control');
const SCREEN_LIMIT = 11;
const maxValue = getMaxValue(SCREEN_LIMIT);

function getMaxValue(max) {
  let maxValue = '';
  for (i = 0; i < max; i++) {
    maxValue += '9';
  }
  return maxValue;
}

let previousNumber = null;
let operator = null;
let reset = false;
let operatorUsed = false;
let screenContent = '0';
updateScreen();

digits.forEach((digit) => {
  digit.addEventListener('click', addNumber);
});
controls.forEach((control) => {
  control.addEventListener('click', handleControl);
});
document.querySelector('.btn-clear').addEventListener('click', resetAll);

function addNumber(e) {
  operatorUsed = false;
  const number =
    e.currentTarget.textContent !== ',' ? +e.currentTarget.textContent : '.';
  if (number === '.' && screenContent.includes('.')) {
    return;
  }
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

function handleControl(e) {
  const pressed = e.currentTarget.textContent;
  if (operatorUsed) {
    if (pressed !== '=') {
      operator = pressed;
      currentOperator.textContent = operator;
    }
    return;
  } else {
    operatorUsed = true;
    if (pressed !== '=') {
      if (!operator) {
        operator = e.currentTarget.textContent;
      }
      currentOperator.textContent = operator;
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
      currentOperator.textContent = '';
      reset = true;
      return;
    }
    operator = pressed;
    currentOperator.textContent = operator;
    previousNumber = screenContent;
    reset = true;
  }
}

function updateScreen(forcedValue) {
  if (forcedValue) {
    screenContent = '' + forcedValue;
  }
  let tooBig = false;
  if (screenContent.length > SCREEN_LIMIT) {
    if (+screenContent > maxValue) {
      tooBig = true;
      screenContent = maxValue;
    } else {
      const contentArray = Array.from(screenContent);
      const beforeDecimals = contentArray.indexOf('.');
      const possibleDecimals = SCREEN_LIMIT - beforeDecimals;
      screenContent = +screenContent;
      screenContent = screenContent.toFixed(possibleDecimals);
    }
  }
  screenContent = '' + screenContent;
  screen.textContent = screenContent;
  if (tooBig) {
    alert('The number is too big to fit the screen!');
  }
}

function resetAll() {
  screenContent = '0';
  previousNumber = null;
  operator = null;
  reset = false;
  operatorUsed = false;
  screen.textContent = screenContent;
  currentOperator.textContent = '';
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

function add(num1, num2) {
  const result = +num1 + +num2;
  return parseFloat(result.toFixed(SCREEN_LIMIT));
}
function subtract(num1, num2) {
  const result = +num1 - +num2;
  return parseFloat(result.toFixed(SCREEN_LIMIT));
}
function multiply(num1, num2) {
  const result = +num1 * +num2;
  return parseFloat(result.toFixed(SCREEN_LIMIT));
}
function divide(num1, num2) {
  const result = +num1 / +num2;
  return parseFloat(result.toFixed(SCREEN_LIMIT));
}
