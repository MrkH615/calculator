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

//1. make event listeners, at least for numbers and operators
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


  
function putInDispArr(event, dispArr) {
  //let dispArr = [];
  let btnInfo = event.target.textContent;
  console.log(btnInfo);
  dispArr.push(btnInfo);
  console.log(dispArr);
  if (dispArr.join('').includes('=')) {
    parseDispArr(dispArr);
  }
  /*if (operators.test(dispArr.join(''))) {
     parseDispArr(dispArr);
  }*/
  writeToDisplay(dispArr);
  return dispArr;
}

function writeToDisplay(dispArr) {
  const disp = document.querySelector('#disp');
  disp.textContent = dispArr.join('');
}

// 1. parse dispArr into numbers and signs as soon as '=' or second operator clicked

function parseDispArr(dispArr) {
  let dispStr = dispArr.join('');
  console.log(operators);
  //let operatorsAndNums = [];
  //find operator  and put in nums and signs
  let operatorAndNums = dispStr.match(operators); 
  //operatorsAndNums.push(dispStr.match(operators)); //everything nested
  console.log('operatorsAndNums is', operatorAndNums);
  //find everything before and "" 
  let operatorIndex = dispStr.indexOf(operatorAndNums[0]); //finds operator
  /* TODO 
  split dispStr before operatorIndex 
  or slice dispArr*/
  let nums = dispStr.split(operatorAndNums[0]);
  console.log('nums', nums); //need to not put '=' in dispArr
  //and push into operatorsAndNums */
  operatorAndNums.push(...nums); // works, 1 op, 2 nums -- 2nd has equals
  console.log('operatorAndNums', operatorAndNums);
  // use while loop or regex lookbehind? --> everything before and after operator should be number
  //find everything after and ""
}
/*      
2. when any operator or equals pressed
      a. perform operation 
      b. display result
      c. set num1 to result
      d. clear num2
      e. return to step 1

3. do not push '=' or buttons of class 'correct' to dispArr
*/




makeButtonValues();



