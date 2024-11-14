const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    items: [
        {
            productId: String,
            quantity: Number,
            price: Number,
            discount: Number,
            finalPrice: Number,
        }
    ],
    totalCost: Number,
});

module.exports = mongoose.model('History', historySchema);
