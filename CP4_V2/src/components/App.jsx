import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import AdminNavBar from './AdminNavBar'; 
import Cart from './Cart';
import Login from './Login'



const App = () => {
  return (
  <>
    <AdminNavBar />
    <div className='pages'>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Root route for App */}
        <Route path="/home/*" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  </>
  );
};

export default App;
