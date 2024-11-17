import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import Notification from './Notification';

const BasketButton = ({ product }) => {
    const [isInBasket, setIsInBasket] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    useEffect(() => {
        if (isAuthenticated) {
            const basket = JSON.parse(localStorage.getItem('basket')) || [];
            setIsInBasket(basket.some(item => item._id === product._id));
        }
    }, [product, isAuthenticated]);

    const toggleBasket = () => {
        if (!isAuthenticated) {
            setShowNotification(true);
            return;
        }
    
        if (!product || !product._id) {
            console.error("Product or product._id is undefined in toggleBasket");
            return; // Останавливаем выполнение, если product не определен или не содержит _id
        }
    
        let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
        if (isInBasket) {
            // Удаляем товар из корзины
            basket = basket.filter(item => item._id !== product._id);
        } else {
            // Добавляем товар в корзину с количеством 1
            basket.push({ _id: product._id, quantity: 1 });
        }
        
        localStorage.setItem('basket', JSON.stringify(basket));
        setIsInBasket(!isInBasket);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Button 
                onClick={toggleBasket} 
                backgroundColor={isInBasket ? '#dc7125' : '#3498db'}
                hoverColor={isInBasket ? '#c0392b' : '#185e8d'}
                style={{ width: '100%', padding: '0.5rem 2.3125rem' }}
            >
                {isInBasket ? 'В корзине' : 'В корзину'}
            </Button>
            {showNotification && (
                <Notification message="Необходима авторизация" onClose={() => setShowNotification(false)} />
            )}
        </div>
    );
};

export default BasketButton;
