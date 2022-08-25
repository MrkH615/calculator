'use strict';

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

  btns.forEach((btn) => {if (btn.class !== 'correct') {
    btn.addEventListener('click', (event) => putInDispArr(event, dispArr));
    }
  });
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
  writeToDisplay(dispArr);
  return dispArr;
}

function writeToDisplay(dispArr) {
  const disp = document.querySelector('#disp');
  disp.textContent = dispArr.join('');
}

makeButtonValues();

/*
2. store num1, sign, num2 in display array as string
3. write dispArr as string to display 
3. when any operator or equals pressed
      a. perform operation 
      b. display result
      c. set num1 to result
      d. clear num2
      e. return to step 1
*/

