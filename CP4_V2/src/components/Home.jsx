import React, { useState } from 'react';
import ProductList from './ProductList';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div>
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default Home;

