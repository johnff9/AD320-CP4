import React, { useState } from "react";
import PropTypes from "prop-types";

const Products = ({ details, addToCart }) => {
  const { image, name, price, description } = details;
  const [quantity, setQuantity] = useState(1);
  const [validationMessage, setValidationMessage] = useState("");
  const [popUpMessage, setPopUpMessage] = useState(""); // State for pop-up message
  const [showPopUp, setShowPopUp] = useState(false); // State for pop-up visibility

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "" || (value > 0 && !isNaN(value))) {
      setQuantity(value);
      setValidationMessage("");
    } else {
      setValidationMessage("Please enter a valid positive number.");
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0 || isNaN(quantity)) {
      setValidationMessage("Quantity must be a positive number.");
    } else {
      setValidationMessage("");
      addToCart(details, quantity);

      // Show pop-up message
      setPopUpMessage(`${details.name} added to cart!`);
      setShowPopUp(true);

      // Hide the pop-up after 2 seconds
      setTimeout(() => setShowPopUp(false), 2000);
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

      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        placeholder="Enter quantity"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>

      {validationMessage && <p className="validation-error">{validationMessage}</p>}

      {/* Pop-up message */}
      {showPopUp && <div className="pop-up-message">{popUpMessage}</div>}
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
