let display = document.getElementById("display");
let expression = "";

function appendValue(val) {
  if (/[+\-*/%]$/.test(expression) && /[+\-*/%]/.test(val)) return;
  expression += val;
  display.innerText = expression;
}

function clearDisplay() {
  expression = "";
  display.innerText = "0";
}

function calculateResult() {
  try {
    let result = eval(expression);
    display.innerText = result;
    expression = result.toString();
  } catch (error) {
    display.innerText = "Error";
    expression = "";
  }
}
