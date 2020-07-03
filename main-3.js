const OPERATORS = /[×÷+*\/-]/g;

const Calculate = {
    '×': (a,b) => a * b,
    '÷': (a,b) => a / b,
    '+': (a,b) => a + b,
    '-': (a,b) => a - b
}

const DISP = document.querySelector('#disp');

const Decimal = document.querySelector('#decimal');

function putOnDisplay(){ 

    
    let dispItems = [];

    let result;

    let btns = document.querySelectorAll('button');
    btns.forEach(btn => btn.addEventListener('click', event => {

//console.log(event.target.textContent);

        if(event.target.className !== 'correct') {
          
           if (event.target.textContent === '.') {
               Decimal.disabled = true;
           } 
           
           if (event.target.textContent.match(OPERATORS)) { 
               Decimal.disabled = false;
           }

            dispItems.push(event.target.textContent);
            DISP.textContent = dispItems.join('');

        }  else if (event.target.textContent === 'C') {
            dispItems = ['0'];
            DISP.textContent = dispItems.join('');

        }  else if (dispItems[0] === '0' && dispItems[1] !== '.') {
            dispItems.shift(); // works if 0 pressed first
        }  


        if (event.target.textContent === '=') {
           
            let numsAndSigns =  splitAtSigns(dispItems);
            let nums = numsAndSigns['nums'];
            let signs = numsAndSigns['signs'];
            let result = nums[0];

            for (let i = 0; i < nums.length-i; i++) {
                result = Calculate[signs[0]](result, nums[i+1]);
            }

                console.log(result);
                DISP.textContent = result; 
            // equals ends
        } 



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




