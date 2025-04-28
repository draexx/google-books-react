// Componente para filtros y ordenamiento de la lista de libros
// Permite seleccionar categoría y orden de los resultados

import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useBooks } from '../contexts/BooksContext';

/**
 * Componente de filtros que permite al usuario seleccionar el orden y la categoría de los libros.
 * Utiliza el contexto de libros para obtener y actualizar los valores de orden y categoría.
 */
export default function Filters() {
  // Obtener los valores de orden, categoría y funciones para actualizarlos desde el contexto de libros
  const { sort, setSort, categories, filterCategory, setFilterCategory } = useBooks();
  
  return (
    // Contenedor flexible para alinear los selectores de orden y categoría
    <Box display="flex" gap={2} mb={2}>
      {/* Selector de ordenamiento */}
      <FormControl size="small">
        <InputLabel>Ordenar</InputLabel>
        <Select value={sort} label="Ordenar" onChange={e => setSort(e.target.value)}>
          <MenuItem value="relevance">Relevancia</MenuItem>
          <MenuItem value="newest">Más nuevo</MenuItem>
        </Select>
      </FormControl>
      {/* Selector de categoría */}
      <FormControl size="small">
        <InputLabel>Categoría</InputLabel>
        <Select
          value={filterCategory}
          label="Categoría"
          onChange={e => setFilterCategory(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
