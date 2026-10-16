
const display = document.getElementById("display");

let currentInput = "0";
let previousInput = null;
let operator = null;
let resetInput = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === "Error") {
        currentInput = "0";
    }

    if (resetInput) {
        currentInput = number === "." ? "0." : number;
        resetInput = false;
    } else if (number === "." && currentInput.includes(".")) {
        return;
    } else if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentInput === "Error") return;

    if (operator && !resetInput) {
        calculate();
    }

    previousInput = Number(currentInput);
    operator = selectedOperator;
    resetInput = true;
}

function calculate() {
    if (operator === null || previousInput === null ||
        currentInput === "Error") {
        return;
    }

    const secondInput = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = previousInput + secondInput;
            break;
        case "-":
            result = previousInput - secondInput;
            break;
        case "*":
            result = previousInput * secondInput;
            break;
        case "/":
            result = secondInput === 0
                ? "Error"
                : previousInput / secondInput;
            break;
        case "%":
            result = previousInput % secondInput;
            break;
    }

    if (typeof result === "number") {
        result = Number(result.toPrecision(12));
    }

    currentInput = String(result);
    previousInput = null;
    operator = null;
    resetInput = true;

    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    resetInput = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput === "Error" || resetInput) {
        currentInput = "0";
        resetInput = false;
    } else {
        currentInput = currentInput.length > 1
            ? currentInput.slice(0, -1)
            : "0";
    }

    updateDisplay();
}
