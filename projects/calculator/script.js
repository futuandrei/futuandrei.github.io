
'use strict';

// Get display and buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
// console.log(display);


// Initialize variables
let previousInput = '';
let currentInput = '';
let operator = '';
let result = '';

// Calculate function
function calculate(previousInput, operator, currentInput) {
    const prev = parseInt(previousInput);
    const curr = parseInt(currentInput);

    switch (operator) {
        case '+':
            return prev + curr;
        case '-':
            return prev - curr;
        case '*':
            return prev * curr;
        case '/':
            // Handle division by zeo
            return curr !== 0 ? prev / curr : 'Error';
        default:
            return 'Invalid Operation';
    }
}


// Event listeners
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const value = this.value;
        // console.log(value);
        // currentInput = parseInt(value)
        // document.querySelector('.display p').textContent = value;

        if (value === "C") {
            previousInput = '';
            currentInput = '';
            operator = '';
            result = '';
            display.textContent = 0;
            // console.log(value);
            // document.querySelector('.display p').textContent = value;
        } else if (value === "=" && previousInput && operator && currentInput) {
            result = calculate(previousInput, operator, currentInput);
            display.textContent = result;
            currentInput = '';
        } else if (['+', '-', '*', '/'].includes(value)) {
            // if there's input:
            // - previous is updated and current is emptied. Operator variable is assigned with value.

            if (currentInput) {
                previousInput = currentInput;
                operator = value;
                currentInput = '';
            }

        } else if (value === "+/-") {
            currentInput = -Math.abs(currentInput);
            display.textContent = currentInput;

        } else if (!isNaN(value)) {
            // update calculator display eg. if it is a number eg. '5' and '2' currenInput = 52.
            currentInput = currentInput + value;
            display.textContent = currentInput;
            // console.log("else");

        }

    });
});

function myFunction() {
    console.log("button clicked!");
}