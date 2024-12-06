import React, { useState } from "react";
import PropTypes from "prop-types";

const Cart = ({ cart, removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const [removeQuantity, setRemoveQuantity] = useState({}); // Store quantity per item
  const [validationMessage, setValidationMessage] = useState(""); // Store validation message

  // Handle quantity input change
  const handleQuantityChange = (e, itemId, availableQuantity) => {
    const value = e.target.value;
    
    if (value && (isNaN(value) || value <= 0 || !Number.isInteger(Number(value)))) {
      setValidationMessage("Please enter a valid positive integer.");
    } else if (value > availableQuantity) {
      // Display validation message if quantity is greater than available
      setValidationMessage(`You cannot remove more than ${availableQuantity} ${availableQuantity === 1 ? "item" : "items"}.`);
    } else {
      // Clear validation message if input is valid
      setValidationMessage("");
    }

    // Update quantity for specific item
    setRemoveQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  // Handle removal logic
  const handleRemoveItem = (itemId, availableQuantity) => {
    const quantityToRemove = removeQuantity[itemId] || 1; // Default to 1 if no quantity specified

    if (validationMessage) {
      return; // Don't proceed if there is a validation error
    }

    // Check if entered quantity exceeds available quantity
    if (quantityToRemove > availableQuantity) {
      setValidationMessage(`You cannot remove more than ${availableQuantity} ${availableQuantity === 1 ? "item" : "items"}.`);
    } else {
      setValidationMessage(""); // Clear validation message
      removeFromCart(itemId, quantityToRemove);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>

              {/* Input for specifying quantity to remove */}
              <input
                type="number"
                value={removeQuantity[item.id] || 1} // Use stored value for each item
                onChange={(e) => handleQuantityChange(e, item.id, item.quantity)}
                min="1"
                max={item.quantity}
              />
              <button onClick={() => handleRemoveItem(item.id, item.quantity)}>
                Remove {removeQuantity[item.id] || 1} {removeQuantity[item.id] > 1 ? "items" : "item"}
              </button>

              {/* Display validation message if quantity exceeds cart item quantity */}
              {validationMessage && <p className="validation-error">{validationMessage}</p>}
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
