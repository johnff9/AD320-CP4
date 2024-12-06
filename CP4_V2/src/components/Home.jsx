import React, { useState } from 'react';
import ProductList from './ProductList';

const Home = () => {
    const [cartItems, setCartItems] = useState([]);

    // Function to add items to the cart with a specified quantity
    const addToCart = (item, quantity)  => {
        setCart((prevCart) => {
          const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
    
          if (itemIndex > -1) {
            // If item exists, increase its quantity by the specified amount
            const updatedCart = [...prevCart];
            updatedCart[itemIndex].quantity += Number(quantity); // Add specified quantity
            return updatedCart;
          } else {
            // If item doesn't exist, add it to the cart with the specified quantity
            return [...prevCart, { ...item, quantity: Number(quantity) }];
          }
        });
      };

  return (
    <div>
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default Home;
