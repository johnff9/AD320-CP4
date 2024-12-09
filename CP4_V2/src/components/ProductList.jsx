/**
 * ProductList component renders a list of products fetched from Firebase 
 * and allows users to add items to their cart.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.addToCart - Function to handle adding a product to the cart.
 * 
 * @returns {JSX.Element} The rendered ProductList component.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { database } from '../firebase'; // Firebase configuration import
import { ref, get } from 'firebase/database'; // Firebase database functions
import Products from "../ProductItems";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]); // State for storing products
  const [popUpMessage, setPopUpMessage] = useState(""); // State for pop-up message
  const [showPopUp, setShowPopUp] = useState(false); // State for pop-up visibility

  /**
   * Fetches product data from the Firebase database on component mount.
   * Stores the products in state if available.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(database, 'products'); // Reference to 'products' in Firebase
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsArray = Object.keys(productsData).map(key => ({
            id: key,
            ...productsData[key],
          }));
          setProducts(productsArray);
        } else {
          console.log('No products available in Firebase');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Handles adding a product to the cart and displays a temporary pop-up message.
   * 
   * @param {Object} product - The product to add to the cart.
   */
  const handleAddToCart = (product) => {
    addToCart(product);

    // Show pop-up message
    setPopUpMessage(`${product.name} added to cart!`);
    setShowPopUp(true);

    // Hide the pop-up after 2 seconds
    setTimeout(() => setShowPopUp(false), 2000);
  };

  return (
    <div className="items">
      <div className="page-header">Product List</div>
      {showPopUp && <div className="pop-up-message">{popUpMessage}</div>}
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-box">
            <h3 className="product-name">{product.name}</h3>
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <button 
              className="cart-action-button" 
              onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductList.propTypes = {
  /**
   * Function to add a product to the cart.
   */
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
