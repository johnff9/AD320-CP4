import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { database } from '../firebase';  // Import the Firebase configuration
import { ref, get, set } from 'firebase/database';  // Import Firebase functions
import Products from "../ProductItems";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);  // State to store products


  useEffect(() => {
    // Fetch products from Firebase Realtime Database
    const fetchProducts = async () => {
      try {
        const productsRef = ref(database, 'products');  // Reference to 'products' node in Firebase
        const snapshot = await get(productsRef);  // Get the data from Firebase

        if (snapshot.exists()) {
          // Convert the Firebase data to an array of products
          const productsData = snapshot.val();
          const productsArray = Object.keys(productsData).map(key => ({
            id: key,
            ...productsData[key],  // Spread the product properties
          }));
          setProducts(productsArray);  // Set products in state
        } else {
          console.log('No products available in Firebase');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();  // Call the fetch function on mount
  }, []);


  useEffect(() => {
    // Function to load sample products
    const loadSampleProducts = () => {
      setProducts(Products);
  
      // Save the sample products to Firebase
      const productsRef = ref(database, `/products`);
      set(productsRef, Products)
        .then(() => console.log("Sample products loaded to Firebase"))
        .catch((error) =>
          console.error("Error loading sample products to Firebase:", error)
        );
    };

    // loadSampleProducts();  // Call the fetch function on mount
  }, []);

  return (
    <div className="items">
      <h2>Product List</h2>
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
            <button onClick={() => addToCart(product)}>Add to Cart</button>
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
