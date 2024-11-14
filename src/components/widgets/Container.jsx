import React, { useEffect, useState, useRef } from 'react';
import leftIcon from '../../assets/left.svg';
import rightIcon from '../../assets/right.svg';
import Card from './Card';
import './Container.css';

const Container = ({ apiEndpoint, title }) => {
    const [products, setProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/${apiEndpoint}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchData();
    }, [apiEndpoint]);

    const scrollLeft = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement.scrollLeft <= 0) {
            scrollElement.scrollLeft = scrollElement.scrollWidth;
        } else {
            scrollElement.scrollLeft -= 220;
        }
    };

    const scrollRight = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth) {
            scrollElement.scrollLeft = 0;
        } else {
            scrollElement.scrollLeft += 220;
        }
    };

    return (
        <div className='container'>
            <h2>{title}</h2>

            <img src={leftIcon} alt="Left" className="left" onClick={scrollLeft} />

            <div className="cards" ref={scrollRef}>
                {products.map(product => (
                    <Card key={product._id} id={product._id} image={product.image} price={product.price} discount={product.discount} title={product.title} author={product.author} />
                ))}
            </div>

            <img src={rightIcon} alt="Right" className="right" onClick={scrollRight} />
        </div>
    );
};

export default Container;
