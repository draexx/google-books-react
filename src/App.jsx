// Componente principal de la aplicación
// Proporciona los contextos globales de libros y lista de deseos
// Define las rutas principales y la estructura general de la UI

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, Typography } from '@mui/material';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import Wishlist from './components/Wishlist';
import BookDetails from './components/BookDetails';
import { WishlistProvider } from './contexts/WishlistContext';
import { BooksProvider } from './contexts/BooksContext';

export default function App() {
  return (
    // Proveedor de contexto para los datos de libros y filtros
    <BooksProvider>
      {/* Proveedor de contexto para la lista de deseos */}
      <WishlistProvider>
        {/* Estilos base de Material UI */}
        <CssBaseline />
        <Container maxWidth="md">
          {/* Título de la aplicación */}
          <Typography variant="h3" align="center" gutterBottom>
            Google Books React
          </Typography>
          {/* Definición de rutas principales */}
          <Routes>
            {/* Ruta principal: búsqueda, resultados y lista de deseos */}
            <Route path="/" element={
              <>
                {/* Formulario de búsqueda */}
                <SearchForm />
                {/* Lista de resultados de búsqueda */}
                <BookList />
                {/* Lista de deseos */}
                <Wishlist />
              </>
            } />
            {/* Ruta de detalles de libro */}
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </Container>
      </WishlistProvider>
    </BooksProvider>
  );
}
