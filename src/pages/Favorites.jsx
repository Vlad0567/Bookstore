import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/widgets/ProductGrid';
import booksData from '../assets/books.json'; // Импортируем данные о книгах

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Извлечение избранных id из localStorage
        const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Получаем информацию о книгах по их id
        const favoriteBooks = booksData.filter(book => favoriteIds.includes(book._id));
        
        setFavorites(favoriteBooks);
    }, []);

    return (
        <div className="favorites-page">
            <h1 className='hello'>Избранное</h1>
            {favorites.length > 0 ? (
                <ProductGrid products={favorites} title="Ваши избранные товары" emptyMessage="Нет избранных товаров" />
            ) : (
                <p>Нет избранных товаров</p>
            )}
        </div>
    );
};

export default Favorites;
