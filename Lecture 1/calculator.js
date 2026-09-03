/**
 * CLI-Based Calculator using process.argv
 * Web Dev III - Lab Assignment 1
 */

// Step 1: Read command line arguments
// process.argv[0] = node path, process.argv[1] = file path
// process.argv[2] = operation, process.argv[3] = num1, process.argv[4] = num2
const operation = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);

function calculate(op, a, b) {
    // Check if numbers are valid
    if (isNaN(a) || isNaN(b)) {
        console.log("Usage: node calculator.js <operation> <num1> <num2>");
        console.log("Example: node calculator.js add 10 5");
        return;
    }

    let result;

    // Step 2: Perform arithmetic operation
    if (op === "add" || op === "+") {
        result = a + b;
    } else if (op === "sub" || op === "subtract" || op === "-") {
        result = a - b;
    } else if (op === "mult" || op === "multiply" || op === "*") {
        result = a * b;
    } else if (op === "div" || op === "divide" || op === "/") {
        // Prevent division by zero
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

// Step 3: Run only if executed directly from terminal
if (require.main === module) {
    if (operation) {
        calculate(operation, num1, num2);
    } else {
        console.log("Usage: node calculator.js <operation> <num1> <num2>");
        console.log("Example: node calculator.js add 10 5");
    }
}

module.exports = { calculate };
