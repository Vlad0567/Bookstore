const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Подключение файлов маршрутов
const booksRoutes = require('./src/api/books');
const latestRoutes = require('./src/api/latest');
const checkUsernameRoute = require('./src/api/check-username');
const registerRoute = require('./src/api/register');
const loginRoute = require('./src/api/login');
const profileRoute = require('./src/api/profile');
const productRoute = require('./src/api/product');
const favoriteRoutes = require('./src/api/favorites');
const basketRoute = require('./src/api/basket');
const basketDetailsRoutes = require('./src/api/basketDetail');
const historyRoute = require('./src/api/history');
const topSalesRoutes = require('./src/api/topSales');
const recommendationsRoutes = require('./src/api/recommendations');
const categoriesRoute = require('./src/api/categories');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Подключено к MongoDB'))
.catch(error => console.error('Ошибка подключения к MongoDB:', error));

// Подключение маршрутов
app.use('/api/books', booksRoutes);
app.use('/api/latest', latestRoutes);
app.use('/api/check-username', checkUsernameRoute);
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/profile', profileRoute);
app.use('/api/product', productRoute);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/basket', basketRoute);
app.use('/api/basketDetails', basketDetailsRoutes);
app.use('/api/history', historyRoute);
app.use('/api/top-sales', topSalesRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/categories', categoriesRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
