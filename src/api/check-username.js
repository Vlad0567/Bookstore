const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { username } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        res.json({ isUnique: !existingUser });
    } catch (error) {
        console.error('Ошибка при проверке уникальности логина:', error);
        res.status(500).json({ message: 'Ошибка сервера при проверке логина' });
    }
});

module.exports = router;