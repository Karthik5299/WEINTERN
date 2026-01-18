const display = document.getElementById("display");
let expression = "";

function appendNumber(num) {
    if (display.value === "Error") clearDisplay();

    if (num === "." && expression.includes(".")) return;

    expression += num;
    display.value = expression;
}


function appendOperator(op) {
    if (!expression) return;

    const lastChar = expression.slice(-1);
    if ("+-*/".includes(lastChar)) return;

    expression += op;
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "0";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression || "0";
}

function calculateResult() {
    try {
        const result = Function(`"use strict"; return (${expression})`)();
        expression = result.toString();
        display.value = expression;
    } catch {
        display.value = "Error";
        expression = "";
    }
}

function calculatePercent() {
    if (!expression) return;
    expression = (parseFloat(expression) / 100).toString();
    display.value = expression;
}


function calculateSqrt() {
    const value = Number(expression);
    if (value < 0 || isNaN(value)) {
        display.value = "Error";
        expression = "";
        return;
    }
    expression = Math.sqrt(value).toString();
    display.value = expression;
}

function calculateSquare() {
    const value = Number(expression);
    if (isNaN(value)) {
        display.value = "Error";
        expression = "";
        return;
    }
    expression = (value * value).toString();
    display.value = expression;
}


document.addEventListener("keydown", e => {
    if (!isNaN(e.key) || e.key === ".") {
        appendNumber(e.key);
    } else if ("+-*/".includes(e.key)) {
        appendOperator(e.key);
    } else if (e.key === "Enter") {
        calculateResult();
    } else if (e.key === "Backspace") {
        deleteLast();
    } else if (e.key === "Escape") {
        clearDisplay();
    }
});
