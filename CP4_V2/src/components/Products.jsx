import React, { useState } from "react";
import PropTypes from "prop-types";

const Products = ({ details, addToCart }) => {
  const { image, name, price, description } = details;
  const [quantity, setQuantity] = useState(1); // Default quantity is set to 1
  const [validationMessage, setValidationMessage] = useState(""); // Store validation message

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = e.target.value;

    // Check if value is valid: either an empty string or a positive number
    if (value === "" || (value > 0 && !isNaN(value))) {
      setQuantity(value);
      setValidationMessage(""); // Clear validation message if valid input
    } else {
      setValidationMessage("Please enter a valid positive number."); // Set validation message if invalid
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0 || isNaN(quantity)) {
      setValidationMessage("Quantity must be a positive number.");
    } else {
      setValidationMessage(""); // Clear validation message if valid
      addToCart(details, quantity); // Call addToCart with the quantity
    }
  };

  return (
    <li className="items-type">
      <img src={image} alt={name} />
      <h3 className="item-name">
        {name}
        <span className="item-price">${price}</span>
      </h3>
      <span className="item-description">
        <p>{description}</p>
      </span>

      {/* Quantity input */}
      <input
        type="number"
        value={quantity} // Show current quantity
        onChange={handleQuantityChange}
        min="1" // Min quantity is 1
        placeholder="Enter quantity"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* Display validation error if the input is invalid */}
      {validationMessage && <p className="validation-error">{validationMessage}</p>}
    </li>
  );
};

Products.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Products;
