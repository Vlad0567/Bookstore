const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Маршрут для получения всех книг
router.get('/', async (req, res) => {
    try {
        const latestBooks = await Book.find().sort({ date: -1 }); // Сортируем по убыванию даты
        res.json(latestBooks);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при получении книг' });
    }
});

module.exports = router;