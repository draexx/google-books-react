// Componente para mostrar la tarjeta de un libro individual
// Permite ver detalles y agregar a la lista de deseos

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';

/**
 * Componente BookItem que muestra la información de un libro y permite agregarlo a la lista de deseos.
 * 
 * @param {object} book - Objeto que contiene la información del libro (id, título, autores, imagen de portada)
 * @returns {JSX.Element} Tarjeta del libro con botones para ver detalles y agregar a la lista de deseos
 */
export default function BookItem({ book }) {
  // Obtener funciones para agregar y verificar la presencia de un libro en la lista de deseos
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // Desestructurar la información del libro
  const { id, title, authors, thumbnail } = book;
  
  return (
    <Card>
      {/* Imagen de portada del libro */}
      <CardMedia
        component="img"
        height="200"
        image={thumbnail || 'https://via.placeholder.com/128x200?text=No+Image'}
        alt={title}
      />
      <CardContent>
        {/* Título del libro */}
        <Typography variant="h6" noWrap>{title}</Typography>
        {/* Autores del libro */}
        <Typography variant="body2" color="textSecondary" noWrap>
          {authors?.join(', ') || 'Autor desconocido'}
        </Typography>
        {/* Botón para ver detalles */}
        <Button
          variant="outlined"
          color="primary"
          size="small"
          component={Link}
          to={`/book/${id}`}
          sx={{ mt: 1, mr: 1 }}
        >
          Ver detalles
        </Button>
        {/* Botón para agregar a la lista de deseos */}
        <Button
          variant="contained"
          color={isInWishlist(id) ? 'success' : 'secondary'}
          size="small"
          onClick={() => addToWishlist(book)}
          disabled={isInWishlist(id)}
          sx={{ mt: 1 }}
        >
          {isInWishlist(id) ? 'En lista de deseos' : 'Agregar a deseos'}
        </Button>
      </CardContent>
    </Card>
  );
}
