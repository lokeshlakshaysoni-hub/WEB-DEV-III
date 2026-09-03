/**
 * File Manager using Node.js Core 'fs' Module
 * Web Dev III - Lab Assignment 1
 */

// Step 1: Import core fs and path modules
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample.txt');

function runFileLifecycle() {
    console.log("Creating File...");

    // 1. CREATE File (fs.writeFile)
    fs.writeFile(filePath, "Hello Node.js\n", (err) => {
        if (err) {
            console.log("Error creating file:", err.message);
            return;
        }
        console.log("File Created");

        // 2. READ File (fs.readFile)
        console.log("Reading File");
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log("Error reading file:", err.message);
                return;
            }
            process.stdout.write(data);

            // 3. UPDATE File (fs.appendFile)
            fs.appendFile(filePath, "Learning FS Module\n", (err) => {
                if (err) {
                    console.log("Error updating file:", err.message);
                    return;
                }
                console.log("File Updated");

                // Read updated content
                fs.readFile(filePath, 'utf8', (err, updatedData) => {
                    if (err) {
                        console.log("Error reading updated file:", err.message);
                        return;
                    }
                    process.stdout.write(updatedData);

                    // 4. DELETE File (fs.unlink)
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log("Error deleting file:", err.message);
                            return;
                        }
                        console.log("File Deleted");
                    });
                });
            });
        });
    });
}

// Run lifecycle when executed directly
if (require.main === module) {
    runFileLifecycle();
}

module.exports = { runFileLifecycle };
