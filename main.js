


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