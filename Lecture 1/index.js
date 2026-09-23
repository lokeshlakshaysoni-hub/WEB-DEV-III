const logger = require('./modules/logger');
const { calculate } = require('./calculator');
const { rollDice, simulateDiceRolls } = require('./dice');


console.log("   🚀 SMART UTILITY TOOLKIT - LAB ASSIGNMENT 1   ");


console.log("Available Commands:");
console.log("1. Calculator : node calculator.js add 10 5");
console.log("2. Modules    : node app.js");
console.log("3. Server     : node server.js");
console.log("4. File CRUD  : node fileManager.js");
console.log("5. Dice       : node dice.js 5\n");

// Quick demo
logger.info("Running quick demo of Calculator & Dice:\n");

console.log("--- 1. Calculator Demo ---");
calculate("add", 10, 5);
calculate("mult", 6, 7);

console.log("\n--- 2. Dice Demo ---");
console.log(" Dice Rolled: " + rollDice() + "\n");

logger.success("All utilities are ready to run!");
