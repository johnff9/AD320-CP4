import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import NavBar from "./NavBar";
import Cart from "./Cart";
import productItems from "../ProductItems";
import Login from './Login';
import AdminTools from './AdminTools';
import Signup from "./Signup";

/**
 * The main application component that handles routing, cart management, and conditional UI rendering.
 * 
 * @component
 */
const App = () => {
  /**
   * State to manage items in the shopping cart.
   * @type {Array<Object>}
   */
  const [cartItems, setCartItems] = useState([]);

  /**
   * State to manage visibility of the popup notification.
   * @type {boolean}
   */
  const [showPopup, setShowPopup] = useState(false);

  /**
   * Loads the cart items from localStorage when the app mounts.
   * Ensures persistence of the cart across page reloads.
   */
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  /**
   * Adds a product to the shopping cart. If the product already exists in the cart,
   * its quantity is increased. Updates are persisted in localStorage.
   * 
   * @function addToCart
   * @param {Object} product - The product to add to the cart.
   */
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      let updatedCart;
      if (existingItemIndex > -1) {
        updatedCart = prevCart.map((item, index) => 
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      
      if (updatedCart.length !== prevCart.length) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1000);
      }

      return updatedCart;
    });
  };

  /**
   * Removes an item or reduces its quantity in the shopping cart.
   * Updates are persisted in localStorage. If the quantity reaches 0, the item is removed.
   * 
   * @function removeFromCart
   * @param {string} itemId - The ID of the item to remove or reduce.
   * @param {number} [quantity=1] - The amount to reduce the item's quantity by. Default is 1.
   */
  const removeFromCart = (itemId, quantity = 1) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === itemId) {
            const updatedQuantity = item.quantity - quantity;
            return updatedQuantity > 0
              ? { ...item, quantity: updatedQuantity }
              : null;
          }
          return item;
        })
        .filter((item) => item !== null);

      if (updatedCart.length === 0) {
        localStorage.removeItem("cartItems");
      } else {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }

      if (updatedCart.length !== prevCart.length) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1000);
      }

      return updatedCart;
    });
  };

  /**
   * Determines whether the NavBar should be displayed based on the current route.
   * 
   * @type {boolean}
   */
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/" && location.pathname !== "/signup";
  /**
   * Renders the main application with routes and dynamic content.
   * 
   * @returns {JSX.Element} The JSX representation of the application.
   */
  return (
    <>
      {shouldShowNavBar && <NavBar />}
      <div className="pages">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home/*"
            element={<ProductList products={productItems} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cartItems} removeFromCart={removeFromCart} />}
          />
          <Route path="/admin" element={<AdminTools />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  );
};

export default App;

