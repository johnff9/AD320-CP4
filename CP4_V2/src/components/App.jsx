import React, { useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import ProductList from "./ProductList";
import AdminNavBar from './AdminNavBar'; 
import Cart from "./Cart";
import productItems from "../ProductItems";
import Login from './Login';
import Home from './Home';
import AdminTools from './AdminTools';

const App = () => {
  const [cart, setCart] = useState([]); // Maintain cart state

  // Function to add items to the cart with a specified quantity
  const addToCart = (item, quantity) => {
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

  // Function to remove an item from the cart
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

// Hide AdminNavBar if the user is on the login page
const shouldShowNavBar = location.pathname !== '/';

return (
  <>
    {shouldShowNavBar && <AdminNavBar />} {/* Conditionally render the NavBar */}
    <div className="pages">
      <Routes>
        <Route path="/" element={<Login />} /> {/* Root route */}
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
