import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from Products;

const ProductDetail = () => {
    const { id } = useParams();
    const product = Products.find(p => p.id === parseInt(id));
    const { addToCart } = useContext(CartContext);
  
    if (!product) return <h2>Product Not Found</h2>;
  
    return (
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    );
  };

export default ProductDetail;