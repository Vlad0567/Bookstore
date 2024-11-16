import React, { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import './Basket.css';
import books from '../assets/books.json'; // Подгружаем список всех книг

const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        const savedBasket = JSON.parse(localStorage.getItem('basket')) || [];

        // Соединяем данные из savedBasket с полной информацией о книгах из books.json
        const completeBasketItems = savedBasket.map((item) => {
            const bookDetails = books.find((book) => book._id === item._id);
            return {
                ...bookDetails,
                quantity: item.quantity,
            };
        });

        setBasketItems(completeBasketItems);
    }, []);

    const updateQuantity = (productId, delta) => {
        const updatedBasketItems = basketItems.map((item) =>
            item._id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );

        setBasketItems(updatedBasketItems);

        // Сохранение изменений в localStorage
        const updatedBasket = updatedBasketItems.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
        }));
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
    };

    const calculateTotalPrice = () => {
        return basketItems.reduce((total, item) => {
            const discountedPrice = item.price * ((100 - item.discount) / 100);
            return total + discountedPrice * item.quantity;
        }, 0);
    };

    const handlePurchase = () => {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        const purchase = {
            date: new Date().toISOString(),
            items: basketItems.map(item => ({
                _id: item._id,
                image: item.image,
                title: item.title,
                author: item.author,
                price: item.price,
                discount: item.discount,
                quantity: item.quantity,
            })),
            totalCost: calculateTotalPrice(),
        };
        localStorage.setItem('history', JSON.stringify([...history, purchase]));
        localStorage.removeItem('basket');
        alert('Покупка завершена успешно!');
        setBasketItems([]);
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
                                    <tr key={item._id}>
                                        <td>
                                            <img src={item.image || ''} alt={item.title || 'Нет изображения'} className="book-cover" />
                                        </td>
                                        <td>
                                            <strong>{item.title || 'Нет информации'}</strong><br />
                                            {item.author || 'Нет автора'}
                                        </td>
                                        <td>
                                            <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                                            {item.quantity}
                                            <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                                        </td>
                                        <td>{item.price ? `${item.price} ₽` : 'N/A'}</td>
                                        <td>{item.discount ? `${item.discount}%` : 'N/A'}</td>
                                        <td>
                                            {item.price
                                                ? `${(item.price * item.quantity * ((100 - item.discount) / 100)).toFixed(2)} ₽`
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="5" style={{ textAlign: 'right', paddingRight: '2rem' }}>Итоговая стоимость:</td>
                                    <td style={{ textAlign: 'center' }}>{calculateTotalPrice().toFixed(2)} ₽</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="purchase-button-container">
                            <Button
                                style={{ padding: '0.75rem 1.5rem', marginRight: '2rem', fontSize: '1rem' }}
                                onClick={handlePurchase}
                                backgroundColor='#3498db'
                                hoverColor='#185e8d'>
                                Купить
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Basket;
