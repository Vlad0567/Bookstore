import React, { useEffect, useState, useRef } from 'react';
import leftIcon from '../../assets/left.svg';
import rightIcon from '../../assets/right.svg';
import Card from './Card';
import booksData from '../../assets/books.json';
import './Container.css';

const Container = ({ filter, title }) => {
    const [products, setProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        // Фильтрация книг на основе переданного фильтра
        let filteredBooks;
        if (filter === "latest") {
            filteredBooks = [...booksData].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0);
        } else if (filter === "top-sales") {
            filteredBooks = [...booksData].sort((a, b) => b.discount - a.discount).slice(0, 5);
        } else {
            filteredBooks = booksData;
        }
        setProducts(filteredBooks);
    }, [filter]);

    const scrollLeft = () => {
        const scrollElement = scrollRef.current;
        scrollElement.scrollLeft = Math.max(scrollElement.scrollLeft - 220, 0);
    };

    const scrollRight = () => {
        const scrollElement = scrollRef.current;
        scrollElement.scrollLeft = Math.min(scrollElement.scrollLeft + 220, scrollElement.scrollWidth);
    };

    return (
        <div className='container'>
            <h2>{title}</h2>

            <img src={leftIcon} alt="Left" className="left" onClick={scrollLeft} />

            <div className="cards" ref={scrollRef}>
                {products.map(product => (
                    <Card key={product._id} _id={product._id} image={product.image} price={product.price} discount={product.discount} title={product.title} author={product.author} />
                ))}
            </div>

            <img src={rightIcon} alt="Right" className="right" onClick={scrollRight} />
        </div>
    );
};

export default Container;
