import React from 'react';
import PropTypes from "prop-types";
import AddItemForm from "./AddItemForm";

const Cart = ({addItem}) => {
  return (
    <div>
      <h2>Cart</h2>
      <AddItemForm addItem={addItem} />
    </div>
  );
};

Cart.propTypes = {
  addItem: PropTypes.func,
};

export default Cart;