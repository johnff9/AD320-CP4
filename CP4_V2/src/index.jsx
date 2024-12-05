import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from "./components/Router";
import './css/styles.css';

const root = createRoot(document.getElementById('root')); // Make sure 'root' is the ID of your div in index.html
root.render(
  <React.StrictMode>
  <Router />
  </React.StrictMode>
);
