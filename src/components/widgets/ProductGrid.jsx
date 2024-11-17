import React from 'react';
import Card from './Card';
import './ProductGrid.css';

const ProductGrid = ({ products, title, emptyMessage = "Ошибка вывода" }) => {
    return (
        <div className="product-grid-page">
            <h2>{title}</h2>
            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <Card
                            key={product._id}
                            _id={product._id}
                            image={product.image}
                            title={product.title}
                            author={product.author}
                            price={product.price}
                            discount={product.discount}
                        />
                    ))}
                </div>
            ) : (
                <p>{emptyMessage}</p>
            )}
        </div>
    );
};

export default ProductGrid;

