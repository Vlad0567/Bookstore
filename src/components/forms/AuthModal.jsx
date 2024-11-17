import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './AuthModal.css';

const AuthModal = ({ onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username && password) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', username);
            onLoginSuccess();
            onClose();
            window.location.reload()
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>×</button>
                <h2>Авторизация</h2>
                <Input 
                    placeholder="Логин" 
                    value={username} 
                    onChange={(value) => setUsername(value)} 
                    style={{ margin: '1rem 0' }} 
                />
                <Input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(value) => setPassword(value)} 
                    style={{ marginBottom: '1rem' }} 
                />
                <Button 
                    onClick={handleLogin} 
                    backgroundColor='#3498db'
                    hoverColor='#185e8d'
                    style={{ width: '100%' }}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
};

export default AuthModal;
