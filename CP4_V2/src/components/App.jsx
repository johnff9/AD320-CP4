import React, { useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductList from "./ProductList";
import NavBar from './NavBar'; 
import Cart from "./Cart";
import productItems from "../ProductItems";
import Login from './Login';
import AdminTools from './AdminTools';
import Signup from "./Signup";

const App = () => {
  const [cart, setCart] = useState([]); 
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
  
      let updatedCart;
      if (existingItemIndex > -1) {
        // If product exists in the cart, update its quantity
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1; 
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  


  const removeFromCart = (itemId, quantity = 1) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === itemId) {
            if (item.quantity <= quantity) {
              return null; // Remove item if quantity is exactly the cart's quantity
            } else {
              return { ...item, quantity: item.quantity - quantity }; // Reduce quantity
            }
          }
          return item;
        })
        .filter((item) => item !== null); // Remove null entries (items fully removed)
      return updatedCart;
    });
  };

const location = useLocation();

// Hide NavBar if the user is on the login page
const shouldShowNavBar = location.pathname !== '/';

return (
  <>
    {shouldShowNavBar && <NavBar />} {/* Conditionally render the NavBar */}
    <div className="pages">
      <Routes>
        <Route path="/" element={<Login />} /> {/* Root route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/*" element={<ProductList products={productItems} addToCart={addToCart} />} /> {/* Home route */}
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} /> {/* Cart route */}
        <Route path="/admin" element={<AdminTools />} /> {/* Admin route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} /> {/* Catch-all route */}
      </Routes>
    </div>
  </>
  );
}

export default App;
