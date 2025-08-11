// Component to display the user's wishlist.
// Allows removing books from the wishlist.

import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Wishlist component: displays the user's wishlist and allows removing books.
 *
 * Uses the WishlistContext to get the wishlist and the function to remove books.
 *
 * If the wishlist is empty, nothing is rendered.
 */
export default function Wishlist() {
  // Get the wishlist and the function to remove books from the WishlistContext.
  const { wishlist, removeFromWishlist } = useWishlist();

  // If the wishlist is empty, render nothing.
  if (wishlist.length === 0) return null;

  return (
    // Main container with top and bottom margin.
    <Box mt={4} mb={2}>
      {/* Section title. */}
      <Typography variant="h5" gutterBottom>Wishlist</Typography>
      {/* List of books. */}
      <List>
        {/* Renders each book in the wishlist. */}
        {wishlist.map(book => (
          // List item with a secondary action to delete the book.
          <ListItem key={book.id} secondaryAction={
            // Button to delete the book.
            <IconButton edge="end" aria-label="delete" onClick={() => removeFromWishlist(book.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            {/* Book information. */}
            <ListItemText
              primary={book.title}
              secondary={book.authors?.join(', ') || 'Unknown author'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
