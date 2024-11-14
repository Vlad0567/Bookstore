const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Поиск пользователя в базе данных
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Неверный логин или пароль' });
        }

        // Проверка пароля с использованием bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Неверный логин или пароль' });
        }

        // Если авторизация успешна, возвращаем положительный ответ
        res.json({ success: true, username: user.username,
            userId: user._id, message: 'Авторизация успешна' });
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

module.exports = router;
