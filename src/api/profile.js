const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }, 'username createdAt');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Пользователь не найден' });
        }

        res.json({
            success: true,
            user: {
                username: user.username,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Ошибка при получении данных профиля:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

module.exports = router;
