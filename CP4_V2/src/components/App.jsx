import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import AdminNavBar from './AdminNavBar'; 
import Cart from './Cart';

const App = () => {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
