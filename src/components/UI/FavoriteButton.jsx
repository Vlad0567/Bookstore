import React, { useState, useEffect } from 'react';
import favoriteIcon from '../../assets/favorite.svg';
import inFavoriteIcon from '../../assets/inFavorite.svg';
import Notification from './Notification';
import './FavoriteButton.css';

const FavoriteButton = ({ productId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    useEffect(() => {
        if (isAuthenticated && productId) { // Добавляем проверку productId
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.includes(productId));
        }
    }, [productId, isAuthenticated]);

    const toggleFavorite = () => {
        if (!isAuthenticated) {
            setShowNotification(true);
            return;
        }

        if (!productId) {
            console.error("Product ID is missing");
            return;
        }

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            // Удаляем из избранного
            favorites = favorites.filter(id => id !== productId);
        } else {
            // Добавляем в избранное
            favorites.push(productId);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
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
                <Notification message="Необходима авторизация" onClose={() => setShowNotification(false)} />
            )}
        </div>
    );
};

export default FavoriteButton;
