import React from 'react';
import products from '../Products';

const ProductList = () => {
  return (
    <div className="items">
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-box">
            <h3 className="product-name">{product.name}</h3>
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
