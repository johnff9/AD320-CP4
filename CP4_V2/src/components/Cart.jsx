import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";

/**
 * A React component that displays the shopping cart items and provides functionality
 * for removing items or adjusting their quantities.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.cart - Array of cart items.
 * @param {Function} props.removeFromCart - Function to handle item removal from the cart.
 */
const Cart = ({ cart, removeFromCart }) => {
  /**
   * State to track the quantity of items to be removed for each cart item.
   * @type {Object.<string, number>}
   */
  const [removeQuantity, setRemoveQuantity] = useState({});

  /**
   * State to track validation messages for each cart item.
   * @type {Object.<string, string>}
   */
  const [validationMessages, setValidationMessages] = useState({});

  /**
   * Effect to set an empty cart message if there are no items in the cart
   * when the component is mounted.
   */
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (savedCartItems.length === 0) {
      setValidationMessages((prev) => ({
        ...prev,
        emptyCart: "Your cart is empty.",
      }));
    }
  }, []);

  /**
   * Handles changes in the input field for removing item quantities.
   * Validates the input and updates the remove quantity state.
   * 
   * @param {Object} e - The event object.
   * @param {string} itemId - The ID of the cart item.
   * @param {number} maxQuantity - The maximum available quantity of the item.
   */
  const handleQuantityChange = useCallback((e, itemId, maxQuantity) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: value === "" ? "" : parsedValue,
    }));

    if (value !== "" && (isNaN(parsedValue) || parsedValue <= 0)) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: "Please enter a valid positive integer.",
      }));
    } else if (parsedValue > maxQuantity) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: `You cannot remove more than ${maxQuantity} ${maxQuantity === 1 ? "item" : "items"}.`,
      }));
    } else {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: "",
      }));
    }
  }, []);

  /**
   * Handles the removal of a specified quantity of a cart item.
   * Validates the input before proceeding with removal.
   * 
   * @param {string} itemId - The ID of the cart item to remove.
   * @param {number} availableQuantity - The maximum available quantity of the item.
   */
  const handleRemoveItem = useCallback((itemId, availableQuantity) => {
    const quantityToRemove = removeQuantity[itemId] || 1;

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
        [itemId]: `You cannot remove more than ${availableQuantity} ${availableQuantity === 1 ? "item" : "items"}.`,
      }));
      return;
    }

    setValidationMessages((prev) => ({
      ...prev,
      [itemId]: "",
    }));
    removeFromCart(itemId, quantityToRemove);

    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: "",
    }));
  }, [removeFromCart, removeQuantity]);

  /**
   * Handles keydown events for the remove button, allowing removal with the "Enter" key.
   * 
   * @param {Object} event - The keyboard event.
   * @param {string} itemId - The ID of the cart item to remove.
   */
  const handleRemoveKeyDown = useCallback((event, itemId) => {
    if (event.key === "Enter") {
      handleRemoveItem(itemId, 1);
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
