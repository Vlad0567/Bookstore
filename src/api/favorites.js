const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Book = require('../models/Book');

// Добавить в избранное
router.post('/', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const existingFavorite = await Favorite.findOne({ userId, productId });
        if (existingFavorite) return res.status(400).json({ message: 'Уже в избранном' });

        const favorite = new Favorite({ userId, productId });
        await favorite.save();
        res.status(200).json({ message: 'Добавлено в избранное' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Удалить из избранного
router.delete('/', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await Favorite.findOneAndDelete({ userId, productId });
        res.status(200).json({ message: 'Удалено из избранного' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Проверить статус избранного
router.get('/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const favorite = await Favorite.findOne({ userId, productId });
        res.status(200).json({ isFavorite: !!favorite });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Получить все избранные книги пользователя
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Ищем все избранные книги для данного пользователя и получаем полную информацию о книгах через populate
        const favorites = await Favorite.find({ userId }).populate('productId'); // Используем productId для получения книги
        const books = favorites.map(fav => fav.productId); // Извлекаем данные о книге
        
        res.status(200).json({ favorites: books });
    } catch (error) {
        console.error('Ошибка при получении избранных книг:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
