const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const validateProduct = require('../middleware/validateProduct');
const validateObjectId = require('../middleware/validateObjectId');


// 1. CREATE PRODUCT
router.post('/', validateProduct, async (req, res, next) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });

    } catch (error) {
        next(error);
    }
});


// 2. GET ALL PRODUCTS WITH FILTERING, SORTING AND PAGINATION
router.get('/', async (req, res, next) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: 'i'
            };
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }

            if (
                Number.isNaN(filter.price.$gte) ||
                Number.isNaN(filter.price.$lte)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid price filter'
                });
            }
        }

        const currentPage = Math.max(1, Number(page) || 1);
        const pageLimit = Math.min(100, Math.max(1, Number(limit) || 10));

        let sortOption = { createdAt: -1 };

        if (sort === 'price') {
            sortOption = { price: 1 };
        } else if (sort === '-price') {
            sortOption = { price: -1 };
        } else if (sort === 'name') {
            sortOption = { name: 1 };
        } else if (sort === '-name') {
            sortOption = { name: -1 };
        }

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip((currentPage - 1) * pageLimit)
            .limit(pageLimit);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage,
            totalPages: Math.ceil(totalProducts / pageLimit),
            products
        });

    } catch (error) {
        next(error);
    }
});


// 3. LOW-STOCK ALERT REPORT
// Keep this route above /:id
router.get('/reports/low-stock', async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ['$quantity', '$lowStockThreshold']
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            message: 'Low-stock products report',
            products
        });

    } catch (error) {
        next(error);
    }
});


// 4. CATEGORY-WISE INVENTORY SUMMARY USING AGGREGATION
router.get('/reports/category-summary', async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: '$quantity' },
                    totalInventoryValue: {
                        $sum: {
                            $multiply: ['$price', '$quantity']
                        }
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    totalProducts: 1,
                    totalQuantity: 1,
                    totalInventoryValue: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Category-wise inventory summary',
            summary
        });

    } catch (error) {
        next(error);
    }
});


// 5. UPDATE PRODUCT DETAILS
router.put('/:id', validateObjectId, validateProduct, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });

    } catch (error) {
        next(error);
    }
});


// 6. STOCK ADJUSTMENT: RESTOCK OR SALE
router.patch('/:id/stock', validateObjectId, async (req, res, next) => {
    try {
        const { action, quantity } = req.body;

        if (
            !['restock', 'sale'].includes(action) ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'Provide action as restock or sale and a positive whole-number quantity'
            });
        }

        let update;

        if (action === 'restock') {
            update = { $inc: { quantity: quantity } };
        } else {
            update = { $inc: { quantity: -quantity } };
        }

        const filter = { _id: req.params.id };

        if (action === 'sale') {
            filter.quantity = { $gte: quantity };
        }

        const product = await Product.findOneAndUpdate(
            filter,
            update,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            const existingProduct = await Product.findById(req.params.id);

            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Insufficient stock for this sale'
            });
        }

        res.status(200).json({
            success: true,
            message: action === 'restock'
                ? 'Stock increased successfully'
                : 'Stock decreased successfully',
            product
        });

    } catch (error) {
        next(error);
    }
});


// 7. GET SINGLE PRODUCT BY ID
router.get('/:id', validateObjectId, async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        next(error);
    }
});


// 8. DELETE PRODUCT
router.delete('/:id', validateObjectId, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            product
        });

    } catch (error) {
        next(error);
    }
});


module.exports = router;