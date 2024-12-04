import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './css/styles.css';
import CartProvider from './components/CartContext';

const root = createRoot(document.getElementById('root')); // Make sure 'root' is the ID of your div in index.html
root.render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
