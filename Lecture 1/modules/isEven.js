// Function to check if a number is Even or Odd
function isEven(num) {
    // If remainder when divided by 2 is 0, it is even
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

// Export the function so other files can require() it
module.exports = isEven;
