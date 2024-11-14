const express = require('express');
const router = express.Router();
const History = require('../models/History');
const Basket = require('../models/Basket');
const Book = require('../models/Book');

router.post('/', async (req, res) => {
    try {
        const { userId, items, totalCost, date } = req.body;

        // Сохранение покупки в истории
        const newHistory = new History({ userId, items, totalCost, date });
        await newHistory.save();

        // Удаление товаров из корзины пользователя после успешной покупки
        await Basket.deleteMany({ userId });

        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Ошибка при сохранении истории покупок:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Получение истории заказов с данными о книгах
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Находим все заказы пользователя
        const orders = await History.find({ userId });

        // Обходим каждый заказ и получаем данные книг по productId
        const ordersWithBookDetails = await Promise.all(
            orders.map(async (order) => {
                const itemsWithBookDetails = await Promise.all(
                    order.items.map(async (item) => {
                        const book = await Book.findById(item.productId); // Получаем данные книги по productId
                        return {
                            ...item._doc,
                            book: book ? {
                                title: book.title,
                                author: book.author,
                                image: book.image
                            } : null
                        };
                    })
                );

                return {
                    ...order._doc,
                    items: itemsWithBookDetails
                };
            })
        );

        res.status(200).json({ orders: ordersWithBookDetails });
    } catch (error) {
        console.error('Ошибка при получении истории заказов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
