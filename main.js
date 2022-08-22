function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

/*
1. store num1, sign, num2 in display array as string
2. when any operator or equals pressed
      a. perform operation 
      b. display result
      c. set num1 to result
      d. clear num2
      e. return to step 1
*/

