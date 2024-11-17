import React from 'react';
import Container from '../components/widgets/Container';
import './Home.css';

const Home = () => {
    return (
        <div>
            <h1 className='hello'>Добро пожаловать в наш Мир книг!</h1>
            <Container filter="latest" title="Новинки" />
            <Container filter="top-sales" title="Хиты продаж" />
        </div>
    );
};

export default Home;
