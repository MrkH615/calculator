
const OPERATORS = /[×÷+*\/-]/g;
const Neg = /[–]/g;

const Calculate = {
 
  '×': (a,b) => a * b,
  '÷': (a,b) => a / b,
  '+': (a,b) => a + b,
  '-': (a,b) => a - b,  
}

const DISP = document.querySelector('#disp');

const Decimal = document.querySelector('#decimal');

const Operator = document.querySelectorAll('button.operator'); 

const NUM = document.querySelectorAll('button.num');

const Backspace = document.getElementById('#backspace'); 

function putOnDisplay(){ 

  let dispItems = [];
  let result;

  let btns = document.querySelectorAll('button');
  btns.forEach(btn => btn.addEventListener('click', event => {

    if(event.target.className !== 'correct') {

      if (dispItems[0] === '0' && dispItems[1] !== '.') {
        dispItems.shift();
      }
            
      if (event.target.className == 'operator') { 
        Operator.forEach(operator => {
          operator.disabled = true}); 
      }
             
      if (event.target.className == 'num') { 
        Operator.forEach(operator => {
          operator.disabled = false});
      }
          
      if (event.target.textContent === '.') {
        Decimal.disabled = true;
      } 
           
      if (event.target.textContent.match(OPERATORS)) { 
        Decimal.disabled = false;
      }

      //event.target.textContent === "⁺⁄₋" ? dispItems.push('–') : dispItems.push(event.target.textContent);  
          //en dash, not minus sign   &#x2013; &#8211;

      event.target.textContent === "⁺⁄₋" ? dispItems = negSign(dispItems) : dispItems.push(event.target.textContent); 
           
      if (event.target.textContent === '0' && dispItems[dispItems.indexOf('0') -1] === '÷' 
      || dispItems[dispItems.indexOf('0')] && dispItems[dispItems.indexOf('0')-1] === '÷') {  
        Operator.forEach(btn => btn.disabled = true); 
        NUM.forEach(btn => btn.disabled = true); 
        dispItems = ['ERROR! C = clear'];
    
      } 

      DISP.textContent = dispItems.join('');

      }  else if (event.target.textContent === 'C') {  //why does this work here? - className = 'correct'
            dispItems = ['0'];
            DISP.textContent = dispItems.join('');
            btns.forEach(btn => btn.disabled = false);

      } else if (event.target.id === 'backspace') {  
          dispItems.pop();
          DISP.textContent = dispItems.join('');
      }
      
      if (event.target.textContent === '=') {
           
        let numsAndSigns =  splitAtSigns(dispItems);
        let nums = numsAndSigns['nums'];
        let signs = numsAndSigns['signs'];
        let result = getResult(nums,signs);
        dispItems=result; 
        DISP.textContent = dispItems.join('');
            
      } 

    }));

}    

putOnDisplay();

function splitAtSigns(arr) {
        
  arr.pop(); //removes equals sign
  let arrStr = arr.join('');
  let signs = Array.from(arrStr.matchAll(OPERATORS), sgn => sgn[0]); 
  let nums = arrStr.split(OPERATORS)
                   .map(num => num.replace(Neg, '-'))
                   .map(num => Number(num));
  let numsAndSigns = {};
  numsAndSigns['nums'] = nums; 
  numsAndSigns['signs'] = signs;
  return numsAndSigns;         
}

function getResult(nums, signs){
  let numsToDrop;
  while(nums.length > 1) {

    for (let i=0; i <nums.length; i++)  {
        
      switch(signs[i]) {
        case '×': 
             
          nums.splice(i,2, Calculate[signs[i]](nums[i],nums[i+1]));
          signs.splice(i,1);
          i=i-2;
        break;
      
        case '÷':
         
          nums.splice(i,2, Calculate[signs[i]](nums[i], nums[i+1]));
          signs.splice(i,1);
          i=i-2;
        break;
          } 
        
        }
      
        for (let j=0; j<nums.length; ++j) {
       
          switch(signs[j]) {
          
            case '+':
             
              nums.splice(j, 2, Calculate[signs[j]](nums[j],nums[j+1]));
              signs.splice(j,1);
              j=j-2;
            break;
      
            case '-':
      
              nums.splice(j, 2,Calculate[signs[j]](nums[j], nums[j+1]));
              signs.splice(j,1);
              j=j-2;
           
            break;  
           }
        } 
        let result = nums;
        return result.toString().split('');
      }
}

function clear() {
  console.log('clear()');
  dispItems = ['0'];
  DISP.textContent = dispItems.join('');
  //btns.forEach(btn => btn.disabled = false);
  Operator.forEach(btn => btn.disabled = false);
  NUM.forEach(btn => btn.disabled = false);
  //DISP.classList.remove('error');
  console.log(DISP.className);
  return dispItems;
}

function negSign(dispItems) { //doesn't work for 1st # entered in calculator

  console.log('in NegSign');
  //dispItems.push('–');
  let dispString = dispItems.join('');
  let allOps = dispString.match(OPERATORS);
  let lastOp = allOps[allOps.length - 1];
  let lastOpPos = dispItems.indexOf(lastOp);


  /*let signPos;
  let negPos = dispItems.indexOf(dispString.match(Neg)[0]); //without [0], en dash at very beginning 
  let allOperatorsPos = dispString.matchAll(OPERATORS);
  console.log(allOperatorsPos);//[0]undefined
  for (let anOp of allOperatorsPos) { //shows operators
    console.log('for of '+anOp); 
  }*/
  /*
    if (dispString.match(OPERATORS)) { 
     
      console.log(dispString.match(OPERATORS)[0]); //without [0], en dash at very beginning 
      
       signPos  = dispItems.indexOf(dispString.match(OPERATORS)[0]);//without [0], en dash at very beginning 
       console.log('signPos '+ signPos); //always same value
       //if no operator, no signPos b/c of if
       //if 2 ops same, neg at beg and right after sign
    }
*/

dispItems.splice(lastOpPos + 1, 0, '–'); //at leftside only
//dispItems.splice(signPos+1, 0, '–');
//dispItems.pop();
console.log(`dispItems in negSign is ${dispItems}`);
return dispItems;

}


