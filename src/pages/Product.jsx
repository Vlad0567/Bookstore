import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BasketButton from '../components/UI/BasketButton';
import FavoriteButton from '../components/UI/FavoriteButton';
import genreColors from '../assets/colors.json';
import books from '../assets/books.json'; // Подключаем статический файл с данными о книгах
import './Product.css';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Ищем продукт по id в статическом файле books.json
        const foundProduct = books.find((book) => book._id === id);
        setProduct(foundProduct || null); // Устанавливаем продукт или null, если не найден
    }, [id]);

    if (!product) return <p>Товар не найден</p>;

    const discountedPrice = product.discount
        ? product.price - (product.price * (product.discount / 100))
        : product.price;

    return (
        <div className="product-page">
            <div className="product-content">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="product-info">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-author">Автор: {product.author}</p>
                    <p className="product-genre">
                        {product.genre.map((genre, index) => (
                            <Link
                                to={`/categories/${genre}`} 
                                key={index}   
                                className="product-genre-badge"
                                style={{ backgroundColor: genreColors[genre] || '#eee' }}
                            >
                                {genre}
                            </Link>
                        ))}
                    </p>
                    <p className="product-date">Дата выхода: {new Date(product.date).getFullYear()}</p>
                    <p className="product-pages">Количество страниц: {product.pages}</p>
                    <p className="product-publisher">Издатель: {product.publisher}</p>
                    <p className="product-language">Язык: {product.language}</p>
                    <p className="product-summary">{product.summary}</p>
                </div>

                <div className="product-purchase">
                    {product.discount > 0 && <span className="product-original-price">{product.price} ₽</span>}
                    <span className="product-price">{discountedPrice} ₽</span>
                    <div className="product-buttons">
                        <BasketButton product={product} /> {/* Передаем объект продукта */}
                        <FavoriteButton productId={id} /> {/* Передаем объект продукта */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
