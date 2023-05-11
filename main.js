const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = calculator.querySelector(".calculator_display");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  // Is this a number?
  if (type == "number") {
    if (displayValue == "0") {
      display.textContent = keyValue;
    } else if (previousKeyType == "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  //Is this an operator?
  if (type == "operator") {
    const operatorKeys = keys.querySelectorAll('[ data-type="operator"]');
    operatorKeys.forEach((el) => {
      el.dataset.state = "";
    });
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type == "equal") {
    //perform a calculation WITHOUT a function

    // const firstNumber = parseInt(calculator.dataset.firstNumber);
    // const operator = calculator.dataset.operator;
    // const secondNumber = parseInt(displayValue);

    // let result = "";
    // if (operator == "plus") result = firstNumber + secondNumber;
    // if (operator == "minus") result = firstNumber - secondNumber;
    // if (operator == "divide") result = firstNumber / secondNumber;
    // if (operator == "times") result = firstNumber * secondNumber;

    // display.textContent = result;

    //perform a calculation WITH a function

    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;

    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  // Clearing the Calculator

  if (type == "clear") {
    display.textContent = "0";
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);

  // Calculate with 'if'
  let result = "";
  if (operator == "plus") result = firstNumber + secondNumber;
  if (operator == "minus") result = firstNumber - secondNumber;
  if (operator == "divide") result = firstNumber / secondNumber;
  if (operator == "times") result = firstNumber * secondNumber;
  return result;

  // switch (operator) {
  //   case "plus":
  //     result = firstNumber + secondNumber;
  //     break;
  //   case "minus":
  //     result = firstNumber - secondNumber;
  //     break;
  //   case "divide":
  //     result = firstNumber / secondNumber;
  //     break;
  //   case "times":
  //     result = firstNumber * secondNumber;
  //     break;
  // }
  // return result;
}
