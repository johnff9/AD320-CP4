import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from "../Products";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL

  return (
    <div>
      <h2>Product Detail</h2>
      <p>Details of Product {id} will go here.</p>
    </div>
  );
};

export default ProductDetail;