import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminNavBar from './AdminNavBar'; 
import Cart from './Cart';
import Login from './Login';
import Home from './Home';
import AdminTools from './AdminTools';

const App = () => {
  const location = useLocation();
  

  // Hide AdminNavBar if the user is on the login page
  const shouldShowNavBar = location.pathname !== '/';

  return (
    <>
      {shouldShowNavBar && <AdminNavBar />} {/* Conditionally render the NavBar */}
      <div className="pages">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Root route */}
          <Route path="/home/*" element={<Home />} /> {/* Home route */}
          <Route path="/cart" element={<Cart />} /> {/* Cart route */}
          <Route path="/admin" element={<AdminTools />} /> {/* Admin route */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} /> {/* Catch-all route */}
        </Routes>
      </div>
    </>
  );
};

export default App;
