import React, { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const username = localStorage.getItem('username');

            if (!username) {
                setError('Пользователь не авторизован');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/profile/${username}`);
                const data = await response.json();

                if (data.success) {
                    setUserData(data.user);
                } else {
                    setError(data.message || 'Ошибка при загрузке профиля');
                }
            } catch (error) {
                console.error('Ошибка при загрузке профиля:', error);
                setError('Ошибка при загрузке профиля');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h1 className="profile-header">Профиль</h1>
                {userData && (
                    <div className="profile-info">
                        <p>Логин: {userData.username}</p>
                        <p>Дата регистрации: {new Date(userData.createdAt).toLocaleDateString()}</p>
                        <Button onClick={() => {
                        localStorage.removeItem('isAuthenticated');
                        localStorage.removeItem('username');
                        window.location.href = '/';  
                    }}
                    backgroundColor = '#d13232'
                    hoverColor = '#ea1717'
                    >Выйти из аккаунта</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
