'use strict';

//const operators = /[+-x÷*\/-]/g; //this also gets numbers '=' is the reason!!
//need to get anything that's not a number and not C or backspace char

//const operators = /[+-x÷*\/]/g; // with match, gets everything but the operator
const operators = /[+\-×÷]/g; // need to escape - because it's a special character

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

function makeButtonValues() { 
  const btns = document.querySelectorAll('button');
  const dispArr = [];
  //const btnInfo;

  btns.forEach((btn) =>  { 
    console.log('button class', btn.class);
    btn.addEventListener('click', (event) => putInDispArr(event, dispArr));
    
    }
  );
  //console.log('dispArr', dispArr);//not defined
/*
  btns.forEach((btn)=> {
    if (btn.class !=='correct') {
      btn.addEventListener('click', (event) => {
        btnInfo = event.target.textContent;
        console.log(btnInfo);
        dispArr.push(btnInfo);
        console.log(dispArr);
      } //close eventListener function
    ); //close event listener
    } //close if
   }); //close forEach
*/
  } //close makeButtonValues


  
function putInDispArr(event, dispArr) { //called by event listener in makeButtonValues()
  //let dispArr = [];
  let btnInfo = event.target.textContent;
  //console.log(btnInfo);
  let result;
  switch (btnInfo) {
    case '=':
      console.log(btnInfo);
      //let [operator, num1, num2] = parseDispArr(dispArr); //returns operatorAndNums
      //console.log(operator, 'num1',num1,'num2', num2);
      result = calculate(dispArr); //not all nums passed pushed to disp array
      console.log('result', result);
      writeToDisplay([`${result}`]);
      break;
    case 'C':
    case '←':
      console.log(btnInfo);
      break;
    default:
      console.log(btnInfo);
      dispArr.push(btnInfo);  
      writeToDisplay(dispArr);
  }
/* 
  dispArr.push(btnInfo);
  console.log(dispArr);
  if (dispArr.join('').includes('=')) {
    parseDispArr(dispArr);
  }
  */
  /*if (operators.test(dispArr.join(''))) {
     parseDispArr(dispArr);
  }*/
  //writeToDisplay(dispArr);
  return dispArr;
}

function writeToDisplay(dispArr) {
  const disp = document.querySelector('#disp');
  disp.textContent = dispArr.join('');
}

// 1. parse dispArr into numbers and signs as soon as '=' or second operator clicked

function parseDisplayArray(dispArr) { //called by putInDisplay()
  let dispStr = dispArr.join('');
  console.log(operators);
  let operatorAndNums = dispStr.match(operators); 
  console.log('operatorsAndNums is', operatorAndNums);
  let nums = dispStr.split(operatorAndNums[0])
                    .map(num => Number(num));
  console.log('nums', nums);
  operatorAndNums.push(...nums);
  console.log('operatorAndNums', operatorAndNums);
  return operatorAndNums;
}
/*      
2. when any operator or equals pressed
      a. perform operation 
      b. display result
      c. set num1 to result
      d. clear num2
      e. return to step 1


*/
function calculate(dispArr) {
  let [operator, num1, num2] = parseDisplayArray(dispArr);
  let result;
  switch (operator) {
    case '+':
      result = operate(add, num1, num2);
      break;
    case '-':
      result = operate(subtract, num1, num2);
      break;
    case '×':
      result = operate(multiply, num1, num2);
      break;
    case '÷':
      result = operate(divide, num1, num2);
      break;
  } 

  console.log(result); 
  return result;
}

makeButtonValues();



