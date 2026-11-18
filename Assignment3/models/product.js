
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },

    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        trim: true
    },

    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Quantity cannot be negative']
    },

    lowStockThreshold: {
        type: Number,
        default: 5,
        min: 0
    },

    description: {
        type: String,
        trim: true
    }

}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
