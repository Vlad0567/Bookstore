import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/widgets/ProductGrid';
import books from '../assets/books.json'; // Импортируем локальный файл с книгами

const Category = () => {
    const { genre } = useParams();
    const [booksByGenre, setBooksByGenre] = useState([]);

    useEffect(() => {
        // Фильтруем книги по жанру из локального файла books.json
        const filteredBooks = books.filter(book => book.genre.includes(genre));
        setBooksByGenre(filteredBooks);
    }, [genre]);

    return (
        <div className="category-page">
            <h1 style={{ margin: '1.125rem 0 0 2.125rem' }}>Категория: {genre}</h1>
            <ProductGrid 
                products={booksByGenre} 
                title={`Книги жанра: ${genre}`} 
                emptyMessage="Нет книг в данной категории" 
            />
        </div>
    );
};

export default Category;
