const express = require('express');
const router = express.Router();
const Basket = require('../models/Basket');

// Проверить, есть ли товар в корзине и его количество
router.get('/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const item = await Basket.findOne({ userId, productId });
        res.json({ isInBasket: !!item, quantity: item ? item.quantity : 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Добавить товар в корзину или обновить количество, если товар уже есть
router.post('/', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const item = await Basket.findOne({ userId, productId });

        if (item) {
            // Если товар уже в корзине, обновляем количество
            item.quantity = (item.quantity || 0) + (quantity || 1);
            await item.save();
        } else {
            // Если товара еще нет, добавляем его с указанным количеством
            const newItem = new Basket({ userId, productId, quantity });
            await newItem.save();
        }

        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Удалить товар из корзины
router.delete('/', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await Basket.findOneAndDelete({ userId, productId });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Обновить количество товара в корзине
router.put('/updateQuantity', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        await Basket.findOneAndUpdate(
            { userId, productId },
            { $set: { quantity } }
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка при обновлении количества:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});


module.exports = router;
