import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message="Необходима авторизация", duration = 3000, onClose, top, left, position = "top" }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`notification ${position === "top" ? "top" : "bottom"}`}
            style={{ top: `${top}px`, left: `${left}px` }}
        >
            {message}
        </div>
    );
};

export default Notification;
