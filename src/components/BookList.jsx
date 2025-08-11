// Component to display the list of book results.
// Includes filters, pagination, and handling of loading and error states.

import React from 'react';
import { useBooks } from '../contexts/BooksContext';
import BookItem from './BookItem';
import Filters from './Filters';
import { Box, Typography, Grid, Pagination } from '@mui/material';

export default function BookList() {
  // Gets book data, loading state, error, current page, and total pages from the books context.
  const { books, loading, error, page, totalPages, setPage } = useBooks();

  return (
    <Box mb={3}>
      {/* Filters and sorting component. */}
      <Filters />
      {/* Loading state. */}
      {loading && <Typography>Loading...</Typography>}
      {/* Error state. */}
      {error && <Typography color="error">{error}</Typography>}
      {/* No results state. */}
      {!loading && books.length === 0 && <Typography>No results found.</Typography>}
      <Grid container spacing={2}>
        {/* Renders each book. */}
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookItem book={book} />
          </Grid>
        ))}
      </Grid>
      {/* Results pagination. */}
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
