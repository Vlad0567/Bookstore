const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Basket', basketSchema);
