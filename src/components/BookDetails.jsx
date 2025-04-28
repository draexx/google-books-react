// Componente para mostrar los detalles completos de un libro seleccionado
// Obtiene los datos de la Google Books API usando el ID del libro

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import axios from 'axios';

/**
 * Componente que muestra los detalles de un libro seleccionado.
 * Utiliza la Google Books API para obtener los datos del libro.
 */
export default function BookDetails() {
  // Obtiene el ID del libro de la URL
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Efecto que se ejecuta cuando el componente se monta o se actualiza.
   * Llama a la Google Books API para obtener detalles del libro.
   */
  useEffect(() => {
    setLoading(true);
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(res => {
        setBook(res.data.volumeInfo);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el libro.');
        setLoading(false);
      });
  }, [id]);

  // Muestra un indicador de carga mientras se obtienen los datos
  if (loading) return <CircularProgress />;
  // Muestra un mensaje de error si no se pueden obtener los datos
  if (error) return <Typography color="error">{error}</Typography>;
  // Muestra un mensaje si no se ha obtenido información del libro
  if (!book) return null;

  return (
    <Box mt={4}>
      {/* Botón para volver a la página principal */}
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        Volver
      </Button>
      {/* Título y autores */}
      <Typography variant="h4" gutterBottom>{book.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {book.authors?.join(', ') || 'Autor desconocido'}
      </Typography>
      {/* Imagen de portada */}
      <img
        src={book.imageLinks?.thumbnail || 'https://via.placeholder.com/128x200?text=No+Image'}
        alt={book.title}
        style={{ marginBottom: 16 }}
      />
      {/* Descripción del libro */}
      <Typography gutterBottom>{book.description || 'Sin descripción.'}</Typography>
      {/* Número de páginas */}
      <Typography variant="body2">Páginas: {book.pageCount || 'N/D'}</Typography>
      {/* Categorías del libro */}
      <Box mt={1} mb={2}>
        {book.categories?.map((cat) => (
          <Chip key={cat} label={cat} sx={{ mr: 1 }} />
        ))}
      </Box>
      {/* Enlaces de información y compra */}
      {book.infoLink && (
        <Button href={book.infoLink} target="_blank" rel="noopener" variant="contained" sx={{ mr: 2 }}>
          Más información
        </Button>
      )}
      {book.canonicalVolumeLink && (
        <Button href={book.canonicalVolumeLink} target="_blank" rel="noopener" variant="outlined">
          Comprar
        </Button>
      )}
    </Box>
  );
}
