import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import NavBar from "./NavBar";
import Cart from "./Cart";
import productItems from "../ProductItems";
import Login from "./Login";
import Home from "./Home";
import AdminTools from "./AdminTools";

const App = () => {
  const [cartItems, setCartItems] = useState([]); // Maintain cart state

  // Initialize cart from localStorage on app load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      let updatedCart;
      if (existingItemIndex > -1) {
        // If product exists in the cart, update its quantity
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1; // Increment quantity by 1
      } else {
        // If product doesn't exist, add it with a quantity of 1
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to local storage
      return updatedCart;
    });
  };

  // Function to remove items from the cart
  const removeFromCart = (itemId, quantity) => {
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
        localStorage.removeItem("cartItems"); // Remove the key if the cart is empty
      } else {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
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
    </>
  );
};

export default App;
