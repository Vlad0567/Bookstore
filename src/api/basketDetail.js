const express = require('express');
const router = express.Router();
const Basket = require('../models/Basket');
const Book = require('../models/Book');

// Эндпоинт для получения корзины пользователя с полной информацией о товарах
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Находим все товары в корзине для данного пользователя
        const basketItems = await Basket.find({ userId });

        // Получаем все productId из корзины
        const productIds = basketItems.map(item => item.productId);

        // Находим информацию о каждом товаре по productId
        const books = await Book.find({ _id: { $in: productIds } });

        // Объединяем данные корзины с данными о товарах
        const detailedBasketItems = basketItems.map(item => {
            const book = books.find(b => b._id.toString() === item.productId);
            return {
                ...item.toObject(),
                book
            };
        });

        res.json({ items: detailedBasketItems });
    } catch (error) {
        console.error('Ошибка при получении корзины:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
