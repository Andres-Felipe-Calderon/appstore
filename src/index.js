import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import reportWebVitals from './reportWebVitals';

// Filtrar los warnings de source maps
if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0] && args[0].includes('Failed to parse source map')) {
      return; // Ignorar el warning de source map
    }
    originalConsoleError(...args);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Solo aquí envuelves tu aplicación con Router */}
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
