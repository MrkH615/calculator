//const OPERATORS = /[–×÷+*\/-]/g;
const OPERATORS = /[×÷+*\/-]/g;
const Neg = /[–]/g;

const Calculate = {
  //'–': (a,b) => a * -b, //call with b =-1, key is en dash U+2013 &#x2013; &#8211;
  //a in '–' is 0???, regardless of whether neg number is first number or second number entered
  //With '–': (a,b) a is 0, b undefined
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

//console.log(event.target.textContent);


        if(event.target.className !== 'correct') {

          if (dispItems[0] === '0' && dispItems[1] !== '.') {
            dispItems.shift();
          }

            //disable operator buttons after operator button clicked
            
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

            /*if (event.target.textContent === "⁺⁄₋") { //textContent still displayed later
              dispItems.push('-');
              //dispItems.pop();
            }*/
            
            
            //enable operator buttons after number button clicked
          
           if (event.target.textContent === '.') {
               Decimal.disabled = true;
           } 
           
           if (event.target.textContent.match(OPERATORS)) { 
               Decimal.disabled = false;
           }


           event.target.textContent === "⁺⁄₋" ? dispItems.push('–') : dispItems.push(event.target.textContent);  
          //NOT A  MINUS SIGN pushed val is en dash U+2013  &ndash; &#x2013; &#8211;
           /*dividing 2 negative 
           numbers results in infinity
           usually on a calculator, input number and then ⁺⁄₋, so put *-1 in dispItems and - in DISP.textContent
           also require at least 1 num to come before neg sign?*/
           

           //dispItems.push(event.target.textContent);
            
           if (event.target.textContent === '0' && dispItems[dispItems.indexOf('0') -1] === '÷' || dispItems[dispItems.indexOf('0')] && dispItems[dispItems.indexOf('0')-1] === '÷') {
            dispItems = ['ERROR!'];  //if C clicked here other error messages are still displayed
             Operator.forEach(btn => btn.disabled = true); 
             NUM.forEach(btn => btn.disabled = true); 
             if (event.target.textContent === 'C') {
               dispItems = clear();
               DISP.textContent = dispItems.join(''); //displays 0, but then setTimeout()s run
               clearTimeout(); //doesn't make a difference here
             } //end of clear
             setTimeout(() => {  //if C clicked here other error messages are still displayed
               DISP.textContent = ['Division by 0'];
             }, 2000);
             setTimeout(() => {
               DISP.textContent = ['Click C to clear'];
             }, 4000); //need to wait until here for C to work
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
            /*let result = nums[0];

            for (let i = 0; i < nums.length-i; i++) {
                result = Calculate[signs[0]](result, nums[i+1]);
            }
                console.log(result);
                DISP.textContent = result; */

            let result = getResult(nums,signs);//.split('');
            console.log('result is a '+typeof result); //with split -> object
            dispItems=result; //seems to work
            //dispItems.push(result);
            console.log(dispItems+' '+typeof(dispItems));//object
            //console.log(typeof dispItems[0]);//object-->strange
            //console.log(dispItems.join(''));
            DISP.textContent = dispItems.join('');

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
        console.log('dispArr in splitAtSigns = ' + arr);
        arr.pop(); //removes equals sign
        let arrStr = arr.join('');
        let signs = Array.from(arrStr.matchAll(OPERATORS), sgn => sgn[0]); 
        console.log('signs ' + signs);
        
        console.log('arrStr.split(OPERATORS) = ' + arrStr.split(OPERATORS));//.replace(/^,/,'')
        console.log(typeof arrStr.split(OPERATORS));//object
      
        //nums = arrStr.split(OPERATORS).map(nmbr => Number(nmbr)); //change nums from strings into nums
        //let nums = arrStr.split(OPERATORS);//.map(nmbr => Number(nmbr)); //change nums from strings into nums
        let nums = arrStr.split(OPERATORS)
                         .map(num => num.replace(Neg, '-'))
                         .map(num => Number(num));
        console.log('nums '+ nums); //undefined
        let numsAndSigns = {};
        numsAndSigns['nums'] = nums; // 
        numsAndSigns['signs'] = signs;

    return numsAndSigns;         
    }

function getResult(nums, signs){
      let numsToDrop;
      while(nums.length > 1) {

        for (let k=0; k<nums.length; k++){
          switch(signs[k]) {
            case '–': 
              nums.splice(k,1, Calculate[signs[k]](nums[k], 1));
              signs.splice(k,1);
              console.log(`nums in neg switch ${nums}`);
              console.log(`signs in neg switch ${signs}`);
          }
        }
      
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
  dispItems = ['0'];
  DISP.textContent = dispItems.join('');
  btns.forEach(btn => btn.disabled = false);
  return dispItems;
}

function sparseToDense (arr) {
  return arr.filter(()=>true);
}


