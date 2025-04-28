// Punto de entrada principal de la aplicación React
// Renderiza el componente App dentro de un Router para habilitar rutas
// Utiliza React.StrictMode para detectar problemas potenciales en desarrollo

import React from 'react'; // Importa la biblioteca React
import ReactDOM from 'react-dom/client'; // Importa el cliente de React DOM
import App from './App'; // Importa el componente principal de la aplicación
import { BrowserRouter } from 'react-router-dom'; // Importa el componente BrowserRouter para habilitar rutas

// Crea el elemento raíz de la aplicación y renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  // Activa el modo estricto de React para detectar problemas potenciales en desarrollo
  <React.StrictMode>
    // Establece el enrutador para la aplicación
    <BrowserRouter>
      // Renderiza el componente App
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
