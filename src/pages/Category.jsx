import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/widgets/ProductGrid';

const Category = () => {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchBooksByGenre = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/categories/${genre}`);
                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }
                const data = await response.json();
                setBooks(data.books || []);
            } catch (error) {
                console.error('Ошибка при загрузке книг по жанру:', error);
            }
        };

        fetchBooksByGenre();
    }, [genre]);

    return (
        <div className="category-page">
            <h1 style={{margin: '1.125rem 0 0 2.125rem'}}>Категория: {genre}</h1>
            <ProductGrid products={books} title={`Книги жанра: ${genre}`} emptyMessage="Нет книг в данной категории" />
        </div>
    );
};

export default Category;
