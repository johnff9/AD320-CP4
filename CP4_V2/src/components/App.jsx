import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import NavBar from "./NavBar";
import Cart from "./Cart";
import productItems from "../ProductItems";
import Login from './Login';
import AdminTools from './AdminTools';
import Signup from "./Signup";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Initialize cart from localStorage on app load
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add items to the cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      let updatedCart;
      if (existingItemIndex > -1) {
        // If product exists in the cart, update its quantity
        updatedCart = prevCart.map((item, index) => 
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to cart
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      
      // Show the popup only if there's an actual change
      if (updatedCart.length !== prevCart.length) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1000); // Hide after 1 second
      }

      return updatedCart;
    });
  };

  // Function to remove items from the cart
  const removeFromCart = (itemId, quantity = 1) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === itemId) {
            const updatedQuantity = item.quantity - quantity;
            return updatedQuantity > 0
              ? { ...item, quantity: updatedQuantity }
              : null; // Remove if quantity <= 0
          }
          return item;
        })
        .filter((item) => item !== null); // Remove null items

      // Save the updated cart to localStorage or clear it if empty
      if (updatedCart.length === 0) {
        localStorage.removeItem("cartItems");
      } else {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }

      // Show the popup only if there's an actual change
      if (updatedCart.length !== prevCart.length) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1000); // Hide after 1 second
      }

      return updatedCart;
    });
  };

  const location = useLocation();

  // Hide NavBar if the user is on the login page
  const shouldShowNavBar = location.pathname !== "/";

  return (
    <>
      {shouldShowNavBar && <NavBar />} {/* Conditionally render the NavBar */}
      <div className="pages">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Root route */}
          <Route
            path="/home/*"
            element={<ProductList products={productItems} addToCart={addToCart} />}
          /> {/* Home route */}
          <Route
            path="/cart"
            element={<Cart cart={cartItems} removeFromCart={removeFromCart} />}
          /> {/* Cart route */}
          <Route path="/admin" element={<AdminTools />} /> {/* Admin route */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} /> {/* Catch-all route */}
        </Routes>
      </div>

      {/* Pop-up message logic */}
      {showPopup && (
        <div className="pop-up-message">
          Item added to cart!
        </div>
      )}
    </>
  );
};

export default App;
