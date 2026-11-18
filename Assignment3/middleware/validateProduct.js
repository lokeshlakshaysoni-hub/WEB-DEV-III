const validateProduct = (req, res, next) => {

    const allowedFields = [
        'name',
        'sku',
        'category',
        'price',
        'quantity',
        'lowStockThreshold',
        'description'
    ];

    if (!req.body || typeof req.body !== 'object' ||
        Array.isArray(req.body) || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Request body cannot be empty'
        });
    }

    const invalidFields = Object.keys(req.body).filter(
        field => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid fields provided',
            invalidFields
        });
    }

    next();
};

module.exports = validateProduct;