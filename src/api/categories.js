const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
        // Находим все книги, которые содержат указанный жанр
        const books = await Book.find({ genre: genre });
        res.status(200).json({ books });
    } catch (error) {
        console.error('Ошибка при получении книг по жанру:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении книг по жанру' });
    }
});

module.exports = router;
