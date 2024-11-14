import React, { useState, useEffect } from 'react';
import favoriteIcon from '../../assets/favorite.svg';
import inFavoriteIcon from '../../assets/inFavorite.svg';
import Notification from './Notification';
import './FavoriteButton.css';

const FavoriteButton = ({ productId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    useEffect(() => {
        if (isAuthenticated) {
            const checkFavoriteStatus = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/favorites/${userId}/${productId}`);
                    const data = await response.json();
                    setIsFavorite(data.isFavorite);
                } catch (error) {
                    console.error('Ошибка при проверке избранного:', error);
                }
            };
            checkFavoriteStatus();
        }
    }, [productId, userId, isAuthenticated]);

    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            setShowNotification(true);
            return;
        }

        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            const response = await fetch(`http://localhost:5000/api/favorites`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId })
            });
            if (response.ok) {
                setIsFavorite(!isFavorite);
            } else {
                console.error('Ошибка при изменении избранного');
            }
        } catch (error) {
            console.error('Ошибка при изменении избранного:', error);
        }
    };

    return (
        <div className="favorites">
            <img 
                src={isFavorite ? inFavoriteIcon : favoriteIcon}
                alt="Add to favorites"
                className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                title={isAuthenticated ? 'Добавить в избранное' : 'Необходима авторизация'}
            />
             {showNotification && (
                <Notification onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
};

export default FavoriteButton;
