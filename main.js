const digits = document.querySelectorAll('.digit');
const screen = document.querySelector('.screen-content');
const currentOperator = document.querySelector('.current-operator');
const controls = document.querySelectorAll('.control');
const SCREEN_LIMIT = 16;
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
document.addEventListener('keydown', handleKeyboard);
document.querySelector('.btn-clear').addEventListener('click', resetAll);
document.querySelector('.btn-del').addEventListener('click', deleteLastDigit);

function handleKeyboard(e) {
  const possibleDigits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ',',
    '.',
  ];
  const possibleControls = ['*', '-', '+', '/', '=', 'Enter'];
  if (possibleDigits.includes(e.key)) {
    let key = e.key;
    if (key === ',') {
      key = '.';
    }
    addNumber(e, key);
  } else if (possibleControls.includes(e.key)) {
    handleControl(e, e.key);
  }
}

function addNumber(e, forcedNumber) {
  operatorUsed = false;
  const number = forcedNumber
    ? forcedNumber
    : e.currentTarget.textContent !== ','
    ? +e.currentTarget.textContent
    : '.';
  if (number === '.' && screenContent.includes('.')) {
    return;
  }
  if (reset) {
    screenContent = '';
    screenContent += '' + number;
    updateScreen(null, true);
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
    updateScreen(null, true);
    return;
  }
  screenContent += '' + number;
  updateScreen(null, true);
}

function handleControl(e, forcedControl) {
  let pressed = forcedControl ? forcedControl : e.currentTarget.textContent;
  if (pressed === 'Enter') {
    pressed = '=';
  }
  if (operatorUsed) {
    if (pressed !== '=') {
      operator = pressed;
      currentOperator.textContent = operator;
    }
    return;
  } else {
    if (pressed !== '=') {
      operatorUsed = true;
      if (!operator) {
        operator = pressed;
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

function updateScreen(forcedValue, ignoreDecimals = false) {
  if (forcedValue) {
    screenContent = '' + forcedValue;
  }
  if (!ignoreDecimals) {
    screenContent = +screenContent;
    screenContent = parseFloat(screenContent.toFixed(3));
  }
  screenContent = '' + screenContent;
  screen.textContent = screenContent;
}

function deleteLastDigit() {
  if (reset) {
    return;
  }
  if (screenContent.length === 1) {
    screenContent = '0';
  } else {
    screenContent = screenContent.slice(0, screenContent.length - 1);
  }
  updateScreen(null, true);
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
