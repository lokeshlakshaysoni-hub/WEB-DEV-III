const isEven = require('./modules/isEven');
const logger = require('./modules/logger');

logger.info("Custom Modules Reusability Demo");

logger.info("Testing isEven with sample numbers:");
const numbers = [4, 7, 10, 15, 20];

for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (isEven(num)) {
        logger.success("Number " + num + " is EVEN");
    } else {
        logger.warn("Number " + num + " is ODD");
    }
}

logger.info("Filtering array of numbers using isEven:");
const allNumbers = [12, 23, 34, 45, 56, 67, 78];
const evenNumbers = allNumbers.filter(isEven);

console.log("Original List :", allNumbers);
console.log("Filtered Evens:", evenNumbers);

logger.success("Module demonstration finished successfully!");
