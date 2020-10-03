
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

const Operator = document.querySelectorAll('button.operator'); // getElementsByClassName

const NUM = document.querySelectorAll('button.num');

const Backspace = document.getElementById('#backspace'); //←

function putOnDisplay(){ 

    
    let dispItems = [];

    let result;

    let btns = document.querySelectorAll('button');
    btns.forEach(btn => btn.addEventListener('click', event => {

        if(event.target.className !== 'correct') {

          if (dispItems[0] === '0' && dispItems[1] !== '.') {
            dispItems.shift();
          }
            
            //if (event.target.textContent.match(OPERATORS)){  //works 
            if (event.target.className == 'operator') { // works
              Operator.forEach(operator => {
                operator.disabled = true}); 
            }
            
            //if (event.target.textContent.match(/[0-9]/)){ //works 
            if (event.target.className == 'num') { //works
              Operator.forEach(operator => {
                operator.disabled = false});
            }
          
           if (event.target.textContent === '.') {
               Decimal.disabled = true;
           } 
           
           if (event.target.textContent.match(OPERATORS)) { 
               Decimal.disabled = false;
           }


           event.target.textContent === "⁺⁄₋" ? dispItems.push('–') : dispItems.push(event.target.textContent);  
          //en dash, not minus sign   &#x2013; &#8211;
           
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

        }   else if (event.target.id === 'backspace') {  
          dispItems.pop();
          console.log(dispItems);
          DISP.textContent = dispItems.join('');
        }


        if (event.target.textContent === '=') {
           console.log(dispItems);
            let numsAndSigns =  splitAtSigns(dispItems);
            let nums = numsAndSigns['nums'];
            let signs = numsAndSigns['signs'];
           

            let result = getResult(nums,signs);//.split('');
            console.log('result is a '+typeof result); //with split -> object
            dispItems=result; //seems to work
            
            console.log(dispItems+' '+typeof(dispItems));//object
            DISP.textContent = dispItems.join('');

            // equals ends
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
        //console.log('Final answer '+ result); 
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




