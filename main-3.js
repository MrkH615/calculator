const OPERATORS = /[×÷+*\/-]/g;

const Calculate = {
    '×': (a,b) => a * b,
    '÷': (a,b) => a / b,
    '+': (a,b) => a + b,
    '-': (a,b) => a - b
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

//console.log(event.target.textContent);


        if(event.target.className !== 'correct') {

            //disable operator buttons after operator button clicked
            
            //if (event.target.textContent.match(OPERATORS)){  //works 
            if (event.target.className == 'operator') { // works
              Operator.forEach(operator => {operator.disabled = true}); 
            }
            
            //if (event.target.textContent.match(/[0-9]/)){ //works 
            if (event.target.className == 'num') { //works
              Operator.forEach(operator => {operator.disabled = false});
            }
            
            
            //enable operator buttons after number button clicked
          
           if (event.target.textContent === '.') {
               Decimal.disabled = true;
           } 
           
           if (event.target.textContent.match(OPERATORS)) { 
               Decimal.disabled = false;
           }

            dispItems.push(event.target.textContent);
            DISP.textContent = dispItems.join('');

        }  else if (event.target.textContent === 'C') {  //why does this work here? - className = 'correct'
            dispItems = ['0']; //sometimes? unexpected results if calculate after C pressed
            DISP.textContent = dispItems.join('');

        }  else if (dispItems[0] === '0' && dispItems[1] !== '.') {
            dispItems.shift(); // works if 0 pressed first

        }  else if (event.target.id === 'backspace') {
          dispItems.pop();
          DISP.textContent = dispItems.join('');
        }
//code for backspace here?

        if (event.target.textContent === '=') {
           
            let numsAndSigns =  splitAtSigns(dispItems);
            let nums = numsAndSigns['nums'];
            let signs = numsAndSigns['signs'];
            /*let result = nums[0];

            for (let i = 0; i < nums.length-i; i++) {
                result = Calculate[signs[0]](result, nums[i+1]);
            }
                console.log(result);
                DISP.textContent = result; */

            let result = getResult(nums,signs);
            dispItems=[]
            dispItems.push(result);
            console.log(dispItems);
            DISP.textContent = dispItems;

            // equals ends
        } //code for backspace here?
/*
        Backspace.addEventListener('click', (e) => { //←
          //Uncaught TypeError: can't access property "addEventListener", Backspace is null
          dispItems.pop(); 
          console.log(dispItems); 
          DISP.textContent = dispItems.join('');
        }); //doesn't work*/



    }));

}    

putOnDisplay();

function splitAtSigns(arr) {
  arr.pop(); //removes equals sign
        let arrStr = arr.join('');
        let signs = Array.from(arrStr.matchAll(OPERATORS), sgn => sgn[0]); 
        let nums = arrStr.split(OPERATORS).map(nmbr => Number(nmbr)); //change nums from strings into nums
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
        return result.toString();
      }
}




