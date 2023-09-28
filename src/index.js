// React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Main App Component and Providers
import App from './App';
import { AuthProvider } from './components/AuthProvider';

// Styles and Fonts
import './index.css';
import './fonts/VCR_OSD_MONO.ttf';

// Utilities
import reportWebVitals from './reportWebVitals';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main application wrapped with necessary providers
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Performance measurement (optional)
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
