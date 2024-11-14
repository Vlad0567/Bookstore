import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button'
import './Basket.css';

const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');

        if (authStatus === 'true') {
            fetchBasketItems();
        }
    }, []);

    const fetchBasketItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/basketDetails/${userId}`);
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            const data = await response.json();
            const itemsWithQuantity = data.items.map(item => ({
                ...item,
                quantity: item.quantity || 1
            }));
            setBasketItems(itemsWithQuantity);
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error);
        }
    };

    const updateQuantity = (productId, delta) => {
        setBasketItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
        updateQuantityInDatabase(productId, delta);
    };

    const updateQuantityInDatabase = async (productId, delta) => {
        try {
            const item = basketItems.find((item) => item.productId === productId);
            const newQuantity = Math.max(1, item.quantity + delta);
            
            await fetch(`http://localhost:5000/api/basket/updateQuantity`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId, quantity: newQuantity }),
            });
        } catch (error) {
            console.error('Ошибка при обновлении количества товара в корзине:', error);
        }
    };

    const calculateTotalPrice = () => {
        return basketItems.reduce((total, item) => {
            const discountedPrice = item.book.price * ((100 - item.book.discount) / 100);
            return total + discountedPrice * item.quantity;
        }, 0);
    };

    const handlePurchase = async () => {
        const purchaseData = {
            userId,
            items: basketItems.map(({ productId, quantity, book }) => ({
                productId,
                quantity,
                price: book.price,
                discount: book.discount,
                finalPrice: book.price * quantity * ((100 - book.discount) / 100),
            })),
            totalCost: calculateTotalPrice(),
            date: new Date(),
        };

        try {
            const response = await fetch(`http://localhost:5000/api/history`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData),
            });
            if (response.ok) {
                alert('Покупка завершена успешно!');
                navigate('/orders');
            }
        } catch (error) {
            console.error('Ошибка при совершении покупки:', error);
        }
    };



    return (
        <>
        <h1 className='hello'>Корзина</h1>
        <div className="basket-page">
            
            {basketItems.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                <>
                    <table className="basket-table">
                        <thead>
                            <tr>
                                <th>Обложка</th>
                                <th>Название и автор</th>
                                <th>Кол-во</th>
                                <th>Цена</th>
                                <th>Скидка</th>
                                <th>Итоговая цена</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basketItems.map((item) => (
                                <tr key={item.productId}>
                                    <td>
                                        <img src={item.book?.image || ''} alt={item.book?.title || 'Нет изображения'} className="book-cover" />
                                    </td>
                                    <td>
                                        <strong>{item.book?.title || 'Нет информации'}</strong><br />
                                        {item.book?.author || 'Нет автора'}
                                    </td>
                                    <td>
                                        <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                                    </td>
                                    <td>{item.book ? `${(item.book.price * item.quantity).toFixed(2)} ₽` : 'N/A'}</td>
                                    <td>{item.book ? `${item.book.discount}%` : 'N/A'}</td>
                                    <td>
                                        {item.book
                                            ? `${(item.book.price * item.quantity * ((100 - item.book.discount) / 100)).toFixed(2)} ₽`
                                            : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                            <tr className="total-row">
                                <td colSpan="5" style={{textAlign: 'right', paddingRight: '2rem'}}>Итоговая стоимость:</td>
                                <td style={{textAlign:'center'}}>{calculateTotalPrice().toFixed(2)} ₽</td>
                            </tr>
                        </tbody>
                    </table>
                <div className="purchase-button-container">
                    <Button 
                    style={{ padding: '0.75rem 1.5rem',marginRight: '2rem', fontSize: '1rem'}} onClick={handlePurchase} backgroundColor='#3498db' hoverColor='#185e8d'>Купить</Button>
                </div>
            </>
        )}
        </div>
        </>
    );
};

export default Basket;
