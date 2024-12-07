import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { database } from '../firebase';  // Import the Firebase configuration
import { ref, get, set } from 'firebase/database';  // Import Firebase functions
import Products from "../ProductItems";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);  // State to store products
  const [popUpMessage, setPopUpMessage] = useState(""); // State for pop-up message
  const [showPopUp, setShowPopUp] = useState(false); // State for pop-up visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(database, 'products');  // Reference to 'products' node in Firebase
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductList;
