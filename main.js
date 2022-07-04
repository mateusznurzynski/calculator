const digits = document.querySelectorAll('.digit');
const screen = document.querySelector('.screen');
digits.forEach((digit) => {
  digit.addEventListener('click', addNumber);
});

let screenContent = '0';
updateScreen();
function addNumber(e) {
  const SCREEN_LIMIT = 12;
  if (screenContent.length >= SCREEN_LIMIT) {
    return;
  }
  const number =
    e.currentTarget.textContent !== ','
      ? +e.currentTarget.textContent
      : e.currentTarget.textContent;
  if (number === 0 && screenContent === '0') {
    return;
  }
  if (screenContent === '0') {
    if (number !== ',') {
      screenContent = '';
    }
    screenContent += number;
    updateScreen();
    return;
  }
  screenContent += number;
  updateScreen();
}

function updateScreen(forcedValue) {
  if (forcedValue) {
    screenContent = forcedValue;
  }
  screen.textContent = screenContent;
}

function add(num1, num2) {
  return +num1 + +num2;
}
function subtract(num1, num2) {
  return +num1 - +num2;
}
function multiply(num1, num2) {
  return +num1 * +num2;
}
function divide(num1, num2) {
  return +num1 / +num2;
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
  return result;
}
