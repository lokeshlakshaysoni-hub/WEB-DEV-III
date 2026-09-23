const operation = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);

function calculate(op, a, b) {
    if (isNaN(a) || isNaN(b)) {
        console.log("Usage: node calculator.js <operation> <num1> <num2>");
        console.log("Example: node calculator.js add 10 5");
        return;
    }

    let result;

    if (op === "add" || op === "+") {
        result = a + b;
    } else if (op === "sub" || op === "subtract" || op === "-") {
        result = a - b;
    } else if (op === "mult" || op === "multiply" || op === "*") {
        result = a * b;
    } else if (op === "div" || op === "divide" || op === "/") {
        if (b === 0) {
            console.log("Error: Division by zero is not allowed!");
            return;
        }
        result = a / b;
    } else {
        console.log("Error: Invalid operation! Use add, sub, mult, or div.");
        return;
    }

    console.log("Result: " + result);
    return result;
}

if (require.main === module) {
    if (operation) {
        calculate(operation, num1, num2);
    } else {
        console.log("Usage: node calculator.js <operation> <num1> <num2>");
        console.log("Example: node calculator.js add 10 5");
    }
}

module.exports = { calculate };
