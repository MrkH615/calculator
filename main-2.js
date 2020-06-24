const Disp = document.querySelector('#disp');

const Nums = document.querySelectorAll('.num');

const clickNum =  num => dispNums = dispNums * 10 + num;

let dispNums = 0;



Nums.forEach(num => num.addEventListener('click', event => {
  //clickNum(Number(num));
  let pressedNum = num.textContent;
 
  dispNums = clickNum(Number(pressedNum));
 
  Disp.textContent = dispNums;

}
  ));


