const OPERATORS = /[^0-9]/;

function makeBtnIds(){

  let nums = document.getElementsByClassName('num');
  let nmbr = [];
  for (let i = 0; i < nums.length; i++) {
    nmbr.push(nums[i].textContent);
    nums[i].setAttribute('id', `btn${nmbr[i]}`);
  }
}

const DISP = document.querySelector('#disp');

makeBtnIds();
/*
let dispNum = [];
let nmbrBtns = document.querySelectorAll('.num');
nmbrBtns.forEach(btn => btn.addEventListener('click', event => {
  dispNum.push(event.target.textContent);
  //dspN=dispNum.join('');
  DISP.textContent = dispNum.join(''); 
}));
*/

function putOnDisplay(){

  let firstNum;
  let secondNum;
  let dispItems = [];
  let btns = document.querySelectorAll('button');
  btns.forEach(btn => btn.addEventListener('click', event => {
 
  /*console.log(dispItems);
  dispItems.push(event.target.textContent);
  DISP.textContent = dispItems.join('');*/

   if (event.target.textContent === 'C') {  //only displays C, why did this work outside a function?
     
      
      dispItems = ['0'];
   
    } else if (dispItems[0] == 0 && dispItems[1] !== '.') {
        dispItems.shift();
      
    } else if (event.target.id === 'backspace') { //if only works once, leaves a blank on disp, while hangs
        dispItems.pop();
        console.log(dispItems); //backspace char is inserted into dispItems if other keys are pressed after
        DISP.textContent = dispItems.join('');

      } else if (event.target.textContent === '=') {
        
        splitAtSign(dispItems);

        /*let sign = dispItems.toString().match(OPERATORS);
          //let sign = dispItems.toString().match(OPERATORS);
          firstNum = dispItems.slice(0, dispItems.indexOf(sign)).toString();//
          secondNum = dispItems.slice(dispItems.indexOf(sign), dispItems.length+1).toString(); //last number of arr
          console.log(dispItems.toString().indexOf(sign));//-1
          console.log(`firstNum = ${firstNum}`);
          console.log(`secondNum = ${secondNum}`);*/
          console.log(splitAtSign(dispItems));
/*
          switch (splitAtSign(dispItems.sign)) {
            case "+":
              dispItems = operate(add, splitAtSign(dispItems).num1, splitAtSign(dispItems).num2);
              console.log(dispItems);
              DISP.textContent = dispItems;
              break;

              case  "-":
                dispItems = operate(subtract, splitAtSign(dispItems).num1, splitAtSign(dispItems).num2);
                console.log(dispItems);
                DISP.textContent = dispItems;
                break;
          }    
      */          

//if displays result, then Uncaught TypeError: dispItems.push is not a function, switch just error
        if (splitAtSign(dispItems).sign == '+') {
           dispItems = operate(add, splitAtSign(dispItems).num1, splitAtSign(dispItems).num2); 
           console.log(dispItems);
           console.log(typeof dispItems);
           //DISP.textContent = dispItems;//doesn't do anything - WHY NOT?
           //break; must be inside switch
          } else if(splitAtSign(dispItems).sign == '-') {
                dispItems = operate(subtract, splitAtSign(dispItems).num1, splitAtSign(dispItems).num2); 
                console.log(dispItems);
                //DISP.textContent = dispItems;
          } else if(splitAtSign(dispItems).sign == '×'){
            dispItems = operate(multiply, splitAtSign(dispItems).num1, splitAtSign(dispItems).num2); 
            console.log(dispItems);

          } else if(splitAtSign(dispItems).sign == '÷'){
            dispItems = operate(divide, splitAtSign(dispItems).num1, splitAtSign(dispItems).num2); 
            console.log(dispItems);
          }
        }
      //dispItems.splice(dispItems.indexOf('&#767'),1); allows only 1 num at a time
      
      if (event.target.textContent != 'C') {
        if (typeof dispItems != 'number') {
          dispItems.push(event.target.textContent); //After = "dispItems.push not a function" because dispItems becomes a number after splitAtSign
          console.log(dispItems);
          DISP.textContent = dispItems.join('');
        } else {
          DISP.textContent = dispItems
        }  

      }  else {
        dispItems = ['0'];
        DISP.textContent = dispItems;
      }
     }
    //if textContent == '+', store everything before + in a variable
    //slice(0, indexOf('+)) gets dispItems before +, slice(indexOf('+'), dispItems.length-1) after
  
  //}
  ));
}

putOnDisplay();

function splitAtSign(arr) {

  let arrStr = arr.join('');
  let sign = arrStr.match(OPERATORS).toString();
  let num1 = Number(arr.slice(0, arr.indexOf(sign)).join(''));
  console.log(arr.slice(0, arr.indexOf(sign)).join('')); 
  console.log(arrStr.match(OPERATORS).toString());
  console.log(arr.indexOf(sign));
  let num2 = Number(arr.slice(arr.indexOf(sign)+1, arr.length).join(''));
  console.log(num1);
  console.log(num2);
  //let sign = arrStr.match(OPERATORS);
  return {'num1': num1, 'num2': num2, 'sign': sign};
}

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

function clear(dispItems) {
  console.log('clear');
  dispItems = ['0'];
  console.log(dispItems);
  DISP.textContent = dispItems;
  return dispItems;
}