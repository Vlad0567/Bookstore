import React, { useState, useEffect } from 'react';
import './OrderHistory.css'

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');

        if (authStatus === 'true') {
            fetchOrderHistory();
        }
    }, []);

    const fetchOrderHistory = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:5000/api/history/${userId}`);
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            const data = await response.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error('Ошибка при загрузке истории заказов:', error);
        }
    };

    if (!isAuthenticated) {
        return <p>Чтобы увидеть свои покупки, войдите в свой аккаунт.</p>;
    }

    return (
        <div className="order-history-page">
            <h1>История заказов</h1>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order._id} className="order">
                        <h3>ID Заказа: {order._id}</h3>
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
                                {order.items.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img
                                                src={item.book?.image || ''}
                                                alt={item.book?.title || 'Нет изображения'}
                                                className="book-cover"
                                            />
                                        </td>
                                        <td>
                                            <strong>{item.book?.title || 'Нет информации'}</strong><br />
                                            {item.book?.author || 'Нет автора'}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price} ₽</td>
                                        <td>{item.discount}%</td>
                                        <td>{item.finalPrice} ₽</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="5" style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                        Итоговая стоимость:
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{order.totalCost} ₽</td>
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
