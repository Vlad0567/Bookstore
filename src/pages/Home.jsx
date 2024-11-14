import React, { useState, useEffect } from 'react';
import Container from '../components/widgets/Container';
import './Home.css';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasPurchaseHistory, setHasPurchaseHistory] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');

        if (authStatus === 'true') {
            checkPurchaseHistory();
        }
    }, []);

    const checkPurchaseHistory = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch(`http://localhost:5000/api/history/${userId}`);
            const data = await response.json();
            setHasPurchaseHistory(data.orders && data.orders.length > 0);
        } catch (error) {
            console.error('Ошибка при проверке истории покупок:', error);
        }
    };

    return (
        <div>
            <h1 className='hello'>Добро пожаловать в наш Мир книг!</h1>
            <Container apiEndpoint="latest" title="Новинки" />
            <Container apiEndpoint="top-sales" title="Хиты продаж" />
            
            {isAuthenticated && hasPurchaseHistory && (
                <Container apiEndpoint={`recommendations/${localStorage.getItem('userId')}`} title="Рекомендуемые для вас" />
            )}
        </div>
    );
};

export default Home;
