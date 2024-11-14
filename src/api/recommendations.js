const express = require('express');
const router = express.Router();
const History = require('../models/History');
const Book = require('../models/Book');

// Маршрут для получения рекомендаций для пользователя
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Получаем список покупок пользователя
        const userHistory = await History.find({ userId });
        if (userHistory.length === 0) {
            console.log("У пользователя нет покупок.");
            return res.status(200).json([]); // Если нет покупок, возвращаем пустой список
        }

        // Собираем productId всех книг, купленных пользователем
        const userBookIds = userHistory.flatMap(history => history.items.map(item => item.productId));
        
        // Находим пользователей, у которых пересекаются покупки с данным пользователем
        const similarHistories = await History.find({
            userId: { $ne: userId },
            'items.productId': { $in: userBookIds }
        });

        if (similarHistories.length === 0) {
            console.log("Нет похожих пользователей.");
            return res.status(200).json([]);
        }

        // Собираем рекомендации на основе похожих пользователей
        const recommendationMap = {};
        similarHistories.forEach(history => {
            const commonBooks = history.items.filter(item => userBookIds.includes(item.productId)).length;
            const similarityPercentage = (commonBooks / history.items.length) * 100;

            // Логгируем информацию о схожести с данным пользователем
            console.log(`Похожий пользователь: ${history.userId}, процент схожести: ${similarityPercentage.toFixed(2)}%, общие книги: ${commonBooks}`);
            
            history.items.forEach(item => {
                const bookId = item.productId.toString();
                if (!userBookIds.includes(bookId)) {
                    // Добавляем или увеличиваем счётчик упоминаний книги
                    recommendationMap[bookId] = (recommendationMap[bookId] || 0) + (similarityPercentage / 100);
                }
            });
        });

        // Сортируем книги по количеству упоминаний среди похожих пользователей и полученному "весу"
        const sortedRecommendations = Object.entries(recommendationMap)
            .sort((a, b) => b[1] - a[1]) // Сортировка по весу, чтобы получить более значимые рекомендации
            .slice(0, 10) // Ограничиваемся 10 рекомендациями
            .map(entry => entry[0]);

        console.log(`Количество похожих пользователей: ${similarHistories.length}`);
        console.log(`Количество рекомендаций: ${sortedRecommendations.length}`);

        // Находим данные для рекомендованных книг
        const recommendedBooks = await Book.find({ _id: { $in: sortedRecommendations } });

        // Логгируем рекомендуемые книги
        console.log("Рекомендованные книги:");
        recommendedBooks.forEach(book => {
            console.log(`Название: ${book.title}, Автор: ${book.author}, Цена: ${book.price} ₽`);
        });

        // Отправляем список рекомендованных книг клиенту
        res.status(200).json(recommendedBooks);
    } catch (error) {
        console.error('Ошибка при получении рекомендаций:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении рекомендаций' });
    }
});

module.exports = router;
