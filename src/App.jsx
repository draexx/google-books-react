// Main application component.
// Provides global contexts for books and wishlist.
// Defines the main routes and the overall UI structure.

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
    // Context provider for book data and filters.
    <BooksProvider>
      {/* Context provider for the wishlist. */}
      <WishlistProvider>
        {/* Base styles from Material UI. */}
        <CssBaseline />
        <Container maxWidth="md">
          {/* Application title. */}
          <Typography variant="h3" align="center" gutterBottom>
            Google Books React
          </Typography>
          {/* Definition of main routes. */}
          <Routes>
            {/* Main route: search, results, and wishlist. */}
            <Route path="/" element={
              <>
                {/* Search form component. */}
                <SearchForm />
                {/* Search results list component. */}
                <BookList />
                {/* Wishlist component. */}
                <Wishlist />
              </>
            } />
            {/* Book details route. */}
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </Container>
      </WishlistProvider>
    </BooksProvider>
  );
}
