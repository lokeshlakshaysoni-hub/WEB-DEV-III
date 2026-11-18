require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());


// Home route
app.get('/', (req, res) => {
    res.send('Inventory Management System API is Running!');
});


// Product routes
app.use('/api/products', productRoutes);


// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


// Centralized error handling
app.use(errorHandler);


// Connect database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();