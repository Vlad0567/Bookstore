import { Link } from 'react-router-dom';
import BasketButton from '../UI/BasketButton'
import FavoriteButton from '../UI/FavoriteButton';
import './Card.css';

const Card = ({ _id,image, price, discount, title, author}) => {
    
    const discountedPrice = discount ? price - (price * (discount / 100)) : price;

    return (
        <div className="card">
            <Link to={`/product/${_id}`}>
                <img src={image} alt={title} className="card-image" />
            </Link>
            <div className="card-content">
                <Link to={`/product/${_id}`} className="card-title-link">
                    <h3 className="card-title">{title}</h3>
                </Link>
                <p className="card-author">{author}</p>
                <div className="card-prices">
                    {discount > 0 && <span className="card-original-price">{price} ₽</span>}
                    <span className="card-discounted-price">{discountedPrice} ₽</span>
                </div>
                <div className="card-actions">
                    <BasketButton product={{ _id, image, price, discount, title, author }} /> {/* Передаем продукт как объект */}
                    <FavoriteButton productId={_id} />
                </div>
            </div>
        </div>
    );
};

export default Card;