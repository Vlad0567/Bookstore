const express = require('express');
const router = express.Router();
const Product = require('../models/Book');

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log(`Товар с id ${req.params.id} не найден.`);
            return res.status(404).json({ success: false, message: 'Товар не найден' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

module.exports = router;
