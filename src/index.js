import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import socketService from './services/socket';
import store from './store';

// Initialize socket connection
socketService.connect(store);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 