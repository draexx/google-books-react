// Componente para mostrar la lista de deseos del usuario
// Permite eliminar libros de la lista de deseos

import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Componente Wishlist: muestra la lista de deseos del usuario y permite eliminar libros.
 * 
 * Utiliza el contexto WishlistContext para obtener la lista de deseos y la función para eliminar libros.
 * 
 * Si la lista de deseos está vacía, no se renderiza nada.
 */
export default function Wishlist() {
  // Obtener la lista de deseos y la función para eliminar libros del contexto WishlistContext
  const { wishlist, removeFromWishlist } = useWishlist();

  // Si la lista de deseos está vacía, no se renderiza nada
  if (wishlist.length === 0) return null;

  return (
    // Contenedor principal con margen superior e inferior
    <Box mt={4} mb={2}>
      {/* Título de la sección */}
      <Typography variant="h5" gutterBottom>Lista de deseos</Typography>
      {/* Lista de libros */}
      <List>
        {/* Renderiza cada libro en la lista de deseos */}
        {wishlist.map(book => (
          // Elemento de la lista con acción secundaria para eliminar el libro
          <ListItem key={book.id} secondaryAction={
            // Botón para eliminar el libro
            <IconButton edge="end" aria-label="delete" onClick={() => removeFromWishlist(book.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            {/* Información del libro */}
            <ListItemText
              primary={book.title}
              secondary={book.authors?.join(', ') || 'Autor desconocido'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
