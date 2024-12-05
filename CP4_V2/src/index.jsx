import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import './css/styles.css';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')); // Make sure 'root' is the ID of your div in index.html
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
