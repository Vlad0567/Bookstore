import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './AuthModal.css';

const AuthModal = ({ onClose, onLoginSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState({
        minLength: false,
        validChars: false,
        notSameAsPassword: true,
        isUnique: true,
    });
    const [passwordValid, setPasswordValid] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasDigit: false,
    });

    // Валидация логина
    const validateUsername = async (value) => {
        setUsername(value);

        const localValidation = {
            minLength: value.length >= 6,
            validChars: /^[a-zA-Z0-9._]*$/.test(value),
            notSameAsPassword: value !== password && value.length > 0,
        };

        let isUnique = true;
        if (localValidation.minLength && localValidation.validChars) {
            try {
                const response = await fetch(`http://localhost:5000/api/check-username`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: value }),
                });
                const data = await response.json();
                isUnique = data.isUnique;
            } catch (error) {
                console.error('Ошибка при проверке уникальности логина:', error);
            }
        }

        setUsernameValid({
            ...localValidation,
            isUnique,
        });
    };

    // Валидация пароля
    const validatePassword = (value) => {
        setPassword(value);
        setPasswordValid({
            minLength: value.length >= 8,
            hasUppercase: /[A-Z]/.test(value),
            hasLowercase: /[a-z]/.test(value),
            hasDigit: /\d/.test(value),
        });
        setUsernameValid((prev) => ({
            ...prev,
            notSameAsPassword: value !== username && username.length > 0,
        }));
    };

    // Логика регистрации
    const handleRegister = async () => {
        if (
            Object.values(usernameValid).every(Boolean) &&
            Object.values(passwordValid).every(Boolean)
        ) {
            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();

                if (data.success) {
                    console.log('Регистрация успешна');
                    onClose();
                } else {
                    console.error('Ошибка при регистрации:', data.message);
                }
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
            }
        }
    };

    // Логика авторизации
    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
    
                if (data.success) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('username', username); // Сохраняем имя пользователя
                    localStorage.setItem('userId', data.userId);
                    onLoginSuccess();
                    onClose();
                    window.location.reload();
                } else {
                    console.error('Ошибка при авторизации:', data.message);
                }
            } catch (error) {
                console.error('Ошибка при авторизации:', error);
            }
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>×</button>
                <div className="auth-mode-toggle">
                    <span className={`toggle-option ${isLoginMode ? 'active' : ''}`} onClick={() => setIsLoginMode(true)}>Вход</span>
                    <span className="divider">/</span>
                    <span className={`toggle-option ${!isLoginMode ? 'active' : ''}`} onClick={() => setIsLoginMode(false)}>Регистрация</span>
                </div>
                <h2 style={{marginLeft:'0.2rem'}} >{isLoginMode ? 'Авторизация' : 'Регистрация'}</h2>
                <Input placeholder="Логин" value={username} onChange={validateUsername} style={{margin:'1rem 0 1rem 0'}}/>
                {!isLoginMode && (
                    <ul className="validation-list">
                        <li className={usernameValid.minLength ? 'valid' : 'invalid'}>Логин должен быть не менее 6 символов</li>
                        <li className={usernameValid.validChars ? 'valid' : 'invalid'}>Логин должен содержать только латиницу, цифры, точки или подчёркивания</li>
                        <li className={usernameValid.notSameAsPassword ? 'valid' : 'invalid'}>Логин не должен совпадать с паролем</li>
                        <li className={usernameValid.isUnique ? 'valid' : 'invalid'}>Логин должен быть уникальным</li>
                    </ul>
                )}
                <Input type="password" placeholder="Пароль" value={password} onChange={validatePassword} style={{marginBottom:'1rem'}}/>
                {!isLoginMode && (
                    <ul className="validation-list">
                        <li className={passwordValid.minLength ? 'valid' : 'invalid'}>Пароль должен быть не менее 8 символов</li>
                        <li className={passwordValid.hasUppercase ? 'valid' : 'invalid'}>Хотя бы одна заглавная буква</li>
                        <li className={passwordValid.hasLowercase ? 'valid' : 'invalid'}>Хотя бы одна строчная буква</li>
                        <li className={passwordValid.hasDigit ? 'valid' : 'invalid'}>Хотя бы одна цифра</li>
                    </ul>
                )}
                
                <Button 
                    onClick={isLoginMode ? handleLogin : handleRegister} 
                    disabled={!isLoginMode && !(Object.values(usernameValid).every(Boolean) && Object.values(passwordValid).every(Boolean))}
                    backgroundColor='#3498db'
                    hoverColor='#185e8d'
                    style={{width:'100%'}}
                >
                    {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </div>
        </div>
    );
};

export default AuthModal;
