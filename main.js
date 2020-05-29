
let nums = document.getElementsByClassName('num');
let nmbr = [];
for (let i = 0; i < nums.length; i++) {
  nmbr.push(nums[i].textContent);
  nums[i].setAttribute('id', `btn${nmbr[i]}`);
}

let disp = document.querySelector('#disp');
/*
let dispNum = [];
let nmbrBtns = document.querySelectorAll('.num');
nmbrBtns.forEach(btn => btn.addEventListener('click', event => {
  dispNum.push(event.target.textContent);
  //dspN=dispNum.join('');
  disp.textContent = dispNum.join(''); 
}));
*/

let dispItems = [];
let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', event => {
   if (event.target.textContent === 'C') {
      dispItems = [];
      disp.textContent = 0; //0 stays when other keys are pushed
    } else {
      dispItems.push(event.target.textContent);
      disp.textContent = dispItems.join('');
    }
    //if textContent == '+', store everything before + in a variable
  }));



function add(a,b){
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
  return a*b;
}


function divide(a,b) {
    return a/b;
}

/*
function operate(operator, a, b){
  return operator === '*' ? multiply(a,b) : operator === '/'  ? divide(a, b) : operator ==='+' ? add(a,b) : operator === '-' ? subtract(a,b) : 'Please enter an operator and two numbers separtated by commas';

}*/

function operate(operator, a, b) {
    return operator.call(this, a, b);
}