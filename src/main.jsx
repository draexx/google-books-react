// Main entry point for the React application.
// Renders the App component within a Router to enable routing.
// Uses React.StrictMode to detect potential problems in development.

import React from 'react'; // Imports the React library
import ReactDOM from 'react-dom/client'; // Imports the React DOM client
import App from './App'; // Imports the main application component
import { BrowserRouter } from 'react-router-dom'; // Imports the BrowserRouter component to enable routing

// Creates the root element of the application and renders the App component.
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
