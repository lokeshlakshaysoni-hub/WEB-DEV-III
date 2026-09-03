/**
 * Random Dice Simulator using Node.js Core 'crypto' Module
 * Web Dev III - Lab Assignment 1
 */

// Step 1: Import core crypto, fs, and path modules
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const historyFile = path.join(__dirname, 'dice_history.txt');

// Step 2: Function to roll a single 6-sided dice (1 to 6)
function rollDice() {
    // crypto.randomInt(1, 7) returns integer from 1 to 6
    return crypto.randomInt(1, 7);
}

// Step 3: Function to simulate multiple rolls in a loop
function simulateDiceRolls(count = 5) {
    console.log("\nSimulating " + count + " Dice Rolls:");
    console.log("----------------------------");

    const rolls = [];
    for (let i = 1; i <= count; i++) {
        const value = rollDice();
        rolls.push(value);
        console.log("Roll #" + i + ": 🎲 Dice Rolled: " + value);
    }

    // Save history to text file
    const logEntry = "[" + new Date().toISOString() + "] Rolls: " + rolls.join(", ") + "\n";
    fs.appendFileSync(historyFile, logEntry);
    console.log("\n(History saved to dice_history.txt)");
}

// Read CLI arguments
const countArg = process.argv[2];

if (require.main === module) {
    if (!countArg) {
        // Default single roll
        console.log("🎲 Dice Rolled: " + rollDice());
        console.log("\n(Tip: Run 'node dice.js 5' to roll 5 times in a loop)");
    } else {
        const count = parseInt(countArg, 10);
        simulateDiceRolls(count);
    }
}

module.exports = { rollDice, simulateDiceRolls };
