// Componente para mostrar la lista de resultados de libros
// Incluye filtros, paginación y manejo de estados de carga y error

import React from 'react';
import { useBooks } from '../contexts/BooksContext';
import BookItem from './BookItem';
import Filters from './Filters';
import { Box, Typography, Grid, Pagination } from '@mui/material';

export default function BookList() {
  // Obtiene los datos de libros, estado de carga, error, página actual y total de páginas del contexto de libros
  const { books, loading, error, page, totalPages, setPage } = useBooks();

  return (
    <Box mb={3}>
      {/* Filtros y ordenamiento */}
      <Filters />
      {/* Estado de carga */}
      {loading && <Typography>Cargando...</Typography>}
      {/* Estado de error */}
      {error && <Typography color="error">{error}</Typography>}
      {/* Sin resultados */}
      {!loading && books.length === 0 && <Typography>No se encontraron resultados.</Typography>}
      <Grid container spacing={2}>
        {/* Renderiza cada libro */}
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookItem book={book} />
          </Grid>
        ))}
      </Grid>
      {/* Paginación de resultados */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
