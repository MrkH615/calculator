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

  } //close makeButtonValues


  
function putInDispArr(event, dispArr) { //called by event listener in makeButtonValues()
  //let dispArr = [];
  let btnInfo = event.target.textContent;
  //console.log(btnInfo);
  let result;
  switch (btnInfo) {
    case '=':
      console.log(btnInfo);
      result = calculate(dispArr); 
      console.log('result', result);
      dispArr.length=0;
      dispArr.push(result);
      writeToDisplay(dispArr); 
      break;
    case 'C':
      //dispArr.length=0;
      //dispArr.push('0');
      clearDisplayArray(dispArr);
      writeToDisplay(dispArr);
      break;
    case '←':
      console.log(btnInfo);
      console.log(dispArr);
      //remove final element of dispArr;
      backspace(dispArr);
      writeToDisplay(dispArr);
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

  console.log('calculate result',result); 
  return result;
}

function clearDisplayArray(dispArr) {
  dispArr.length = 0;
  dispArr.push('0');
  return dispArr;
}

function backspace(dispArr) {
  
  //let len = dispArr.length
  switch (dispArr.length) {
    case 1:
      dispArr[0].length = dispArr[0].slice(0, dispArr[0].length - 1);
      //when dispArr= result, dispArr[0].slice is not a function (line 142)
      break;
    default:
      dispArr[dispArr.length - 1] = dispArr[dispArr.length -1 ].slice(0, 
        dispArr[dispArr.length-1].length - 1);
        //works before = pressed
  }
  console.log('dispArr',dispArr); 
  return dispArr;
}

makeButtonValues();



