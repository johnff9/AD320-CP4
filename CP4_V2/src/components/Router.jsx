import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductDetail from './ProductDetail';
import Login from './Login';
import Cart from './Cart';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Root route for App */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/home/*" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
