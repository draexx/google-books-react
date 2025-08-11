// Component to display the full details of a selected book.
// Fetches data from the Google Books API using the book ID.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import axios from 'axios';

const DEFAULT_BOOK_COVER_URL = 'https://via.placeholder.com/128x200?text=No+Image';

/**
 * Component that displays the details of a selected book.
 * Uses the Google Books API to fetch the book data.
 */
export default function BookDetails() {
  // Get the book ID from the URL.
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect that runs when the component mounts or updates.
   * Calls the Google Books API to get book details.
   */
  useEffect(() => {
    setLoading(true);
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(res => {
        setBook(res.data.volumeInfo);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load the book.');
        setLoading(false);
      });
  }, [id]);

  // Display a loading indicator while fetching data.
  if (loading) return <CircularProgress />;
  // Display an error message if data cannot be fetched.
  if (error) return <Typography color="error">{error}</Typography>;
  // Display nothing if no book information has been obtained.
  if (!book) return null;

  return (
    <Box mt={4}>
      {/* Button to go back to the main page. */}
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        Go Back
      </Button>
      {/* Title and authors. */}
      <Typography variant="h4" gutterBottom>{book.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {book.authors?.join(', ') || 'Unknown author'}
      </Typography>
      {/* Cover image. */}
      <img
        src={book.imageLinks?.thumbnail || DEFAULT_BOOK_COVER_URL}
        alt={book.title}
        style={{ marginBottom: 16 }}
        loading="lazy"
      />
      {/* Book description. */}
      <Typography gutterBottom>{book.description || 'No description.'}</Typography>
      {/* Page count. */}
      <Typography variant="body2">Pages: {book.pageCount || 'N/A'}</Typography>
      {/* Book categories. */}
      <Box mt={1} mb={2}>
        {book.categories?.map((cat) => (
          <Chip key={cat} label={cat} sx={{ mr: 1 }} />
        ))}
      </Box>
      {/* Info and purchase links. */}
      {book.infoLink && (
        <Button href={book.infoLink} target="_blank" rel="noopener" variant="contained" sx={{ mr: 2 }}>
          More Info
        </Button>
      )}
      {book.canonicalVolumeLink && (
        <Button href={book.canonicalVolumeLink} target="_blank" rel="noopener" variant="outlined">
          Buy
        </Button>
      )}
    </Box>
  );
}
