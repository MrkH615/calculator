//const OPERATORS = /[^0-9]/;
//const OPERATORS = /[+*\/-]/;// /g;    g  for use with matchAll  
const OPERATORS = /[×÷+*\/-]/;

function makeBtnIds(){

  let nums = document.getElementsByClassName('num');
  let nmbr = [];
  for (let i = 0; i < nums.length; i++) {
    nmbr.push(nums[i].textContent);
    nums[i].setAttribute('id', `btn${nmbr[i]}`);
  }
}

const DISP = document.querySelector('#disp');

const Decimal = document.querySelector('#decimal');

makeBtnIds();


//clear display after opertor button clicked (but keep data)
//allow multiple operations before = 

function putOnDisplay(){ 

  let firstNum;
  let secondNum;
  let dispItems = [];
  let btns = document.querySelectorAll('button');
  btns.forEach(btn => btn.addEventListener('click', event => {
 
  /*console.log(dispItems);
  dispItems.push(event.target.textContent);
  DISP.textContent = dispItems.join('');*/

   if (event.target.textContent === 'C') {  
     
      dispItems = ['0'];
   
    } else if (dispItems[0] == 0 && dispItems[1] !== '.') {  // to have only one leading 0
        dispItems.shift();
      
    } /*else if (event.target.textContent.match(OPERATORS) && dispItems[0]=== null) {  //doesn't work, because multiply sign not in OPERATORS
      dispItems = ['0'];  */
      //dispItems.shift(); shift and pop just get rid of initial 0
      // doesn't work if first button clicked is + , either
      //dispItems = [''] Uncaught TypeError: can't access property "toString", arrStr.match(...) is null
  //}    
    else if (event.target.textContent === '.'){  // ok
      Decimal.disabled = true;  //disabled button, also changes colour to light grey
    } 


    else if(event.target.textContent.match(OPERATORS)) {
      Decimal.disabled = false;
    }
    /*else if (dispItems[0].toString().match(OPERATORS)) { //dispItems undefined here
      console.log(dispItems[0].toString());
      //dispItems[0] = '';
    } */
   
   
   /*else if (event.target.textContent === '˿') { //if only works once, leaves a blank on disp, while hangs
      //dispItems = backspace(dispItems);  
      //console.log([...dispItems]);
      dispItems.pop();
      //dispItems = [...dispItems].shift();//leaves only one digit
        //dispItems[dispItems.indexOf('˿')] = '';
        console.log('dispItems after pop' + dispItems); // no backspace char
        //backspace char is inserted into dispItems if other keys are pressed after
        //DISP.textContent = dispItems;//stops = from calling functions   //even with this block commented out, backspace still displays

      } */ else if (event.target.textContent === '=') {
        
        splitAtSign(dispItems);

          console.log(splitAtSign(dispItems));

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
      //code for backspace originally here
      
      if (event.target.textContent != 'C') {

        /*if (dispItems.join('').match(OPERATORS)) {
          dispItems = ['0'];
        }*/


         if (typeof dispItems != 'number') { //number only after = button is clicked

          /*if (dispItems[0].match(OPERATORS)){ //sign as first button click appears only once 
            //above if -> Uncaught TypeError: can't access property "match", dispItems[0] is undefined
            dispItems = ['0']; // attempt to not display signs as first item
          } else { */
          if (dispItems[0] == undefined && event.target.textContent.match(OPERATORS)) {  
            dispItems[0] = '0';
            DISP.textContent = '0';
          } else {

            dispItems.push(event.target.textContent); //After = "dispItems.push not a function" because dispItems becomes a number after splitAtSign
            console.log(dispItems);
            DISP.textContent = dispItems.join('');
          }

        } else {  
          DISP.textContent = dispItems;
        }  

      }  else {
        dispItems = ['0'];
        DISP.textContent = dispItems;
      }
     }
  
  ));
}

putOnDisplay();

function splitAtSign(arr) {  //dynamically allow more nums OR just have multiple calls to func
  //OR just have multiple calls to func BUT that will not allow order of operations

  let arrStr = arr.join('');
  let sign = arrStr.match(OPERATORS).toString();
  let num1 = Number(arr.slice(0, arr.indexOf(sign)).join(''));
  let num2 = Number(arr.slice(arr.indexOf(sign)+1, arr.length).join(''));
 
  return {'num1': num1, 'num2': num2, 'sign': sign};
}

function add(a,b){ //allow 2 + args
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

function backspace(dispItems) {
  [...dispItems].pop();//removes last digit, but adds backspace
  //dispItems[dispItems.indexOf('˿')] = '';
  console.log(dispItems);
  return dispItems;
}

//originally at line 104, after if statements with calls to operate()

//dispItems.splice(dispItems.indexOf('&#767'),1); allows only 1 num at a time
      /*  //This EXTRA CREDIT - do it later
      if (event.target.textContent === '˿') { //if only works once, leaves a blank on disp, while hangs
        //dispItems = backspace(dispItems);  
        //console.log([...dispItems]);
        //DISP.textContent.indexOf('˿').style.display = 'none';//seems to do nothing here
        //event.target.style.display = 'none';// get rid of backspace button
        dispItems.pop();
        dispItems.indexOf('˿').style.display = 'none';//nothing happens until another key is pushed, then works
        //DISP.textContent.indexOf('˿').style.display = 'none';//nothing happens until another key is pushed, then works
        //dispItems = [...dispItems].shift();//leaves only one digit
          //dispItems[dispItems.indexOf('˿')] = '';
          console.log('dispItems after pop' + dispItems); // no backspace char
          //backspace char is inserted into dispItems if other keys are pressed after
          //DISP.textContent = dispItems;//stops = from calling functions   //even with this block commented out, backspace still displays
      }
*/

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