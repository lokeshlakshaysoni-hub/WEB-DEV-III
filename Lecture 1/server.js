/**
 * Basic HTTP Server using Node.js Core 'http' Module
 * Web Dev III - Lab Assignment 1
 */

// Step 1: Import core http module
const http = require('http');
const logger = require('./modules/logger');

const PORT = 3000;

// Step 2: Create HTTP server
const server = http.createServer((req, res) => {
    logger.info("Incoming Request: " + req.method + " " + req.url);

    // Set response header to plain text
    res.setHeader('Content-Type', 'text/plain');

    // Step 3: Simple URL Routing
    if (req.url === '/') {
        res.statusCode = 200;
        res.end("Welcome to Node Server\n");
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.end("About Page\n");
    } else if (req.url === '/contact') {
        res.statusCode = 200;
        res.end("Contact Page\n");
    } else {
        // Any other route returns 404
        res.statusCode = 404;
        res.end("404 Error Message: Page Not Found\n");
    }
});

// Step 4: Start server on port 3000
server.listen(PORT, () => {
    logger.success("Server is running on http://localhost:" + PORT + "/");
    console.log("Visit: http://localhost:" + PORT + "/");
    console.log("Visit: http://localhost:" + PORT + "/about");
    console.log("Visit: http://localhost:" + PORT + "/contact");
    console.log("Press Ctrl + C to stop the server.\n");
});

module.exports = server;
