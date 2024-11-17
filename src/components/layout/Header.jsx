import React, { useState, useEffect, useRef } from 'react';
import AuthModal from '../forms/AuthModal';
import Notification from '../UI/Notification';
import catLogo from "../../assets/cat.png";
import profileIcon from "../../assets/profile.svg";
import ordersIcon from "../../assets/oders.svg";
import favoritesIcon from "../../assets/favorites.svg";
import basketIcon from "../../assets/basket.svg";
import homeIcon from "../../assets/home.svg";
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationPosition, setNotificationPosition] = useState({ top: 0, left: 0 });

    const ordersRef = useRef(null);
    const favoritesRef = useRef(null);
    const basketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const showNotification = (message, ref, position = "top") => {
        if (ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setNotificationPosition({
                top: position === "top" ? rect.top + window.scrollY - 40 : rect.bottom + window.scrollY,
                left: rect.left + rect.width / 2,
            });
            setNotification(message);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleNavigation = (path, ref) => {
        if (isAuthenticated) {
            navigate(path);
        } else {
            showNotification('Необходима авторизация', ref, 'bottom');
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-logo">
                    <img className="header-icon" src={catLogo} alt="Cat on books" />
                    <div className="header-title">Book Zone</div>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="header-item">
                        <img src={homeIcon} alt="Home" className="header-nav-icon" />
                        <div className="header-text">Домой</div>
                    </Link>

                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="header-item header-button">
                            <img src={profileIcon} alt="Logout" className="header-nav-icon" />
                            <div className="header-text">Выйти</div>
                        </button>
                    ) : (
                        <button onClick={() => setIsAuthModalOpen(true)} className="header-item header-button">
                            <img src={profileIcon} alt="Profile" className="header-nav-icon" />
                            <div className="header-text">Войти</div>
                        </button>
                    )}

                    <div className="header-item-container" ref={ordersRef}>
                        <button onClick={() => handleNavigation('/orders', ordersRef)} className="header-item header-button">
                            <img src={ordersIcon} alt="Orders" className="header-nav-icon" />
                            <div className="header-text">Заказы</div>
                        </button>
                    </div>

                    <div className="header-item-container" ref={favoritesRef}>
                        <button onClick={() => handleNavigation('/favorites', favoritesRef)} className="header-item header-button">
                            <img src={favoritesIcon} alt="Favorites" className="header-nav-icon" />
                            <div className="header-text">Закладки</div>
                        </button>
                    </div>

                    <div className="header-item-container" ref={basketRef}>
                        <button onClick={() => handleNavigation('/basket', basketRef)} className="header-item header-button">
                            <img src={basketIcon} alt="Basket" className="header-nav-icon" />
                            <div className="header-text">Корзина</div>
                        </button>
                    </div>
                </nav>
            </header>
            {isAuthModalOpen && (
                <AuthModal onLoginSuccess={handleLoginSuccess} onClose={() => setIsAuthModalOpen(false)} />
            )}
            {notification && (
                <Notification message={notification} position="absolute" top={notificationPosition.top} left={notificationPosition.left} />
            )}
        </>
    );
};

export default Header;
