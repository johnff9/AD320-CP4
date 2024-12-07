import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";

const Cart = ({ cart, removeFromCart }) => {
  const [removeQuantity, setRemoveQuantity] = useState({}); // Store quantity per item
  const [validationMessages, setValidationMessages] = useState({}); // Store validation messages per item

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (savedCartItems.length === 0) {
      // If no items in localStorage, set cart as empty
      setValidationMessages((prev) => ({
        ...prev,
        emptyCart: "Your cart is empty."
      }));
    }
  }, []);

  const handleQuantityChange = useCallback((e, itemId, maxQuantity) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
  
    // Update removeQuantity state
    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: value === "" ? "" : parsedValue, // Set as empty string if input is empty
    }));
  
    // Validate if input is a valid positive integer
    if (value !== "" && (isNaN(parsedValue) || parsedValue <= 0)) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: "Please enter a valid positive integer.",
      }));
    } else if (parsedValue > maxQuantity) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: `You cannot remove more than ${maxQuantity} ${maxQuantity === 1 ? 'item' : 'items'}.`,
      }));
    } else {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: "", // Clear validation if input is valid
      }));
    }
  }, []);
  
  const handleRemoveItem = useCallback((itemId, availableQuantity) => {
    const quantityToRemove = removeQuantity[itemId] || 1; // Default to 1 if not specified
  
    // Validate the quantity before removing
    if (isNaN(quantityToRemove) || quantityToRemove <= 0) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: "Please enter a valid positive integer.",
      }));
      return;
    }
  
    if (quantityToRemove > availableQuantity) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: `You cannot remove more than ${availableQuantity} ${availableQuantity === 1 ? 'item' : 'items'}.`,
      }));
      return;
    }
  
    // Clear any validation message and proceed to remove
    setValidationMessages((prev) => ({
      ...prev,
      [itemId]: "",
    }));
    removeFromCart(itemId, quantityToRemove); // Call parent function
  
    // Reset quantity input to empty after removal
    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: "",
    }));
  }, [removeFromCart, removeQuantity]);

  const handleRemoveKeyDown = useCallback((event, itemId) => {
    if (event.key === 'Enter') {
      handleRemoveItem(itemId, 1); // Pass 1 for default removal if no quantity specified
    }
  }, [handleRemoveItem]);

  return (
    <div className="cart-container">
      <div className="page-header">Your Cart</div>
      {cart.length === 0 ? (
        <div className="empty-cart-message-container">
          <p className="empty-cart-message">Your cart is empty.</p>
        </div>
      ) : (
        <ul className="cart-item-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">Price: ${item.price}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>

              <div className="cart-item-actions">
                <input
                  type="number"
                  value={removeQuantity[item.id] || ""}
                  onChange={(e) => handleQuantityChange(e, item.id, item.quantity)}
                  min="1"
                  max={item.quantity}
                  placeholder="Quantity"
                  className="cart-item-quantity-input"
                />
                <button
                  onClick={() => handleRemoveItem(item.id, item.quantity)}
                  onKeyDown={(event) => handleRemoveKeyDown(event, item.id)}
                  className="cart-action-button"
                >
                  Remove
                </button>
              </div>
              <p className="cart-item-validation-error">
                {validationMessages[item.id]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      quantity: PropTypes.number,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
