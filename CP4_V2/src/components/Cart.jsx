import React from 'react';
import PropTypes from "prop-types";
import AddItemForm from "./AddItemForm";
import AdminNavBar from './AdminNavBar'; 


const Cart = ({addItem}) => {
  return (
    <div>
      <AdminNavBar />
      <h2>Cart</h2>
      <AddItemForm addItem={addItem} />
    </div>
  );
};


Cart.propTypes = {
  addItem: PropTypes.func,
};

export default Cart;