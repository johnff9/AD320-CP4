import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Products component displays product details and allows users to add products to the cart.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.details - The details of the product.
 * @param {number} props.details.id - The unique identifier for the product.
 * @param {string} props.details.image - The URL of the product image.
 * @param {string} props.details.name - The name of the product.
 * @param {number} props.details.price - The price of the product.
 * @param {string} props.details.description - A brief description of the product.
 * @param {Function} props.addToCart - The function to add the product to the cart.
 * @returns {JSX.Element} The rendered Products component.
 */
const Products = ({ details, addToCart }) => {
  const { image, name, price, description } = details;
  const [quantity, setQuantity] = useState(1);
  const [validationMessage, setValidationMessage] = useState("");
  const [popUpMessage, setPopUpMessage] = useState(""); // State for pop-up message
  const [showPopUp, setShowPopUp] = useState(false); // State for pop-up visibility

  /**
   * Handles changes to the quantity input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   */
  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "" || (value > 0 && !isNaN(value))) {
      setQuantity(value);
      setValidationMessage("");
    } else {
      setValidationMessage("Please enter a valid positive number.");
    }
  };

  /**
   * Handles adding the product to the cart with the specified quantity.
   */
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
  /**
   * The product details object.
   */
  details: PropTypes.shape({
    /** The unique identifier for the product. */
    id: PropTypes.number,

    /** The URL of the product image. */
    image: PropTypes.string,

    /** The name of the product. */
    name: PropTypes.string,

    /** The price of the product. */
    price: PropTypes.number,

    /** A brief description of the product. */
    description: PropTypes.string,
  }).isRequired,

  /**
   * Function to add the product to the cart.
   *
   * @param {Object} product - The product details.
   * @param {number} quantity - The quantity to add to the cart.
   */
  addToCart: PropTypes.func.isRequired,
};

export default Products;
