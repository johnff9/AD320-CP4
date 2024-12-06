import React from "react";
import PropTypes from "prop-types";
import Products from "./Products";

const ProductList = ({ products, addToCart }) => {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <Products
          key={product.id}
          details={product}
          addToCart={addToCart} // Pass addToCart as prop
        />
      ))}
    </ul>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
