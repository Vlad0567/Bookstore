import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import Notification from './Notification'

const BasketButton = ({ productId }) => {
    const [isInBasket, setIsInBasket] = useState(false);
    const userId = localStorage.getItem('userId');
    const [showNotification, setShowNotification] = useState(false);
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    useEffect(() => {
        if (isAuthenticated) {
            const checkBasketStatus = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/basket/${userId}/${productId}`);
                    const data = await response.json();
                    setIsInBasket(data.isInBasket);
                } catch (error) {
                    console.error('Ошибка при проверке корзины:', error);
                }
            };
            checkBasketStatus();
        }
    }, [productId, userId, isAuthenticated]);

    const toggleBasket = async () => {
        if (!isAuthenticated) {
            setShowNotification(true);
            return;
        }
    
        try {
            const method = isInBasket ? 'DELETE' : 'POST';
            const response = await fetch(`http://localhost:5000/api/basket`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId })
            });
            
            const result = await response.json();
            if (response.ok) {
                setIsInBasket(!isInBasket);

            } else {
                console.error('Ошибка при изменении корзины:', result.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            console.error('Ошибка при изменении корзины:', error);
        }
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
            <Notification onClose={() => setShowNotification(false)} 
            />
        )}
        </div>
    );
};

export default BasketButton;