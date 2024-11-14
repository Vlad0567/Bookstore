import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/widgets/ProductGrid';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');

        if (authStatus === 'true') {
            fetchFavorites();
        }
    }, []);

    const fetchFavorites = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:5000/api/favorites/${userId}`);
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            const data = await response.json();
            setFavorites(data.favorites || []);
        } catch (error) {
            console.error('Ошибка при загрузке избранного:', error);
        }
    };

    if (!isAuthenticated) {
        return <p>Чтобы увидеть свои избранные товары, войдите в свой аккаунт.</p>;
    }

    return (
        <div className="favorites-page">
            <h1 className='hello'>Избранное</h1>
            {favorites.length > 0 ? (
                <ProductGrid products={favorites} title="Ваши избранные товары" emptyMessage="Нет избранных товаров" />
            ) : (
                <p>Нет избранных товаров</p>
            )}
        </div>
    );
};

export default Favorites;
