// src/components/ProductList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import products from '../Products';

const ProductList = () => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;



