import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        setOrders(history);
    }, []);

    return (
        <div className="order-history-page">
            <h1>История заказов</h1>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index} className="order">
                        <h3>Дата покупки: {new Date(order.date).toLocaleString()}</h3>
                        <table className="order-table">
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
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <img src={item.image || ''} alt={item.title || 'Нет изображения'} className="book-cover" />
                                        </td>
                                        <td>
                                            <strong>{item.title || 'Нет информации'}</strong><br />
                                            {item.author || 'Нет автора'}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price} ₽</td>
                                        <td>{item.discount}%</td>
                                        <td>{(item.price * item.quantity * ((100 - item.discount) / 100)).toFixed(2)} ₽</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="5" style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                        Итоговая стоимость:
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{order.totalCost.toFixed(2)} ₽</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr style={{ margin: '2rem 0' }} />
                    </div>
                ))
            ) : (
                <p>Нет данных о заказах</p>
            )}
        </div>
    );
};

export default OrderHistory;
