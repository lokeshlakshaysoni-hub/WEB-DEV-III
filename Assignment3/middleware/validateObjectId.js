const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product ID'
        });
    }

    next();
};

module.exports = validateObjectId;