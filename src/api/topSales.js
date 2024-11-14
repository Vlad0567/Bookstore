const express = require('express');
const router = express.Router();
const History = require('../models/History');
const Book = require('../models/Book');

// Маршрут для получения топ-10 книг по продажам
router.get('/', async (req, res) => {
    try {
        // Агрегируем данные из истории, чтобы подсчитать количество продаж каждой книги
        const topBooks = await History.aggregate([
            { $unwind: "$items" }, // Распаковываем каждый элемент массива items
            {
                $group: {
                    _id: "$items.productId", // Группировка по productId книги
                    totalSales: { $sum: "$items.quantity" } // Подсчитываем общее количество продаж
                }
            },
            { $sort: { totalSales: -1 } }, // Сортируем по количеству продаж, начиная с самых популярных
            { $limit: 10 } // Ограничиваем до топ-10
        ]);

        // Получаем данные о книгах, соответствующих topBooks
        const bookIds = topBooks.map(book => book._id);
        const books = await Book.find({ _id: { $in: bookIds } });

        // Возвращаем книги, отсортированные по количеству продаж
        const sortedBooks = bookIds.map(id => books.find(book => book._id.equals(id)));
        res.json(sortedBooks);
    } catch (error) {
        console.error("Ошибка при получении топ-10 книг по продажам:", error);
        res.status(500).json({ message: "Ошибка сервера при получении топ-10 книг по продажам" });
    }
});

module.exports = router;
