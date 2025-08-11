// Component to display an individual book card.
// Allows viewing details and adding to the wishlist.

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';

const DEFAULT_BOOK_COVER_URL = 'https://via.placeholder.com/128x200?text=No+Image';

/**
 * BookItem component that displays book information and allows adding it to the wishlist.
 *
 * @param {object} book - Object containing book information (id, title, authors, cover image).
 * @returns {JSX.Element} Book card with buttons to view details and add to wishlist.
 */
function BookItem({ book }) {
  // Get functions to add and check for a book in the wishlist.
  const { addToWishlist, isInWishlist } = useWishlist();

  // Destructure book information.
  const { id, title, authors, thumbnail } = book;

  return (
    <Card>
      {/* Book cover image. */}
      <CardMedia
        component="img"
        height="200"
        image={thumbnail || DEFAULT_BOOK_COVER_URL}
        alt={title}
        loading="lazy"
      />
      <CardContent>
        {/* Book title. */}
        <Typography variant="h6" noWrap>{title}</Typography>
        {/* Book authors. */}
        <Typography variant="body2" color="textSecondary" noWrap>
          {authors?.join(', ') || 'Unknown author'}
        </Typography>
        {/* Button to view details. */}
        <Button
          variant="outlined"
          color="primary"
          size="small"
          component={Link}
          to={`/book/${id}`}
          sx={{ mt: 1, mr: 1 }}
        >
          View Details
        </Button>
        {/* Button to add to wishlist. */}
        <Button
          variant="contained"
          color={isInWishlist(id) ? 'success' : 'secondary'}
          size="small"
          onClick={() => addToWishlist(book)}
          disabled={isInWishlist(id)}
          sx={{ mt: 1 }}
        >
          {isInWishlist(id) ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default React.memo(BookItem);
