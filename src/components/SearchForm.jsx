// Componente de formulario de búsqueda de libros
// Permite buscar por título, autor o ISBN usando la Google Books API
// Utiliza Formik y Yup para manejo y validación de formularios

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Grid } from '@mui/material';
import { useBooks } from '../contexts/BooksContext';

// Esquema de validación para el formulario
// Requiere un campo de texto para la búsqueda y un selector de tipo de búsqueda
const validationSchema = yup.object({
  query: yup.string().required('Campo requerido'),
  type: yup.string().oneOf(['intitle', 'inauthor', 'isbn']).required(),
});

// Función principal del componente
// Utiliza el hook useFormik para manejar el estado del formulario
// y el hook useBooks para acceder al contexto de libros
export default function SearchForm() {
  const { searchBooks } = useBooks();
  const formik = useFormik({
    // Valores iniciales del formulario
    initialValues: { query: '', type: 'intitle' },
    // Esquema de validación
    validationSchema,
    // Función de envío del formulario
    onSubmit: (values) => {
      searchBooks(values);
    },
  });
  return (
    // Contenedor del formulario
    <Box component="form" onSubmit={formik.handleSubmit} mb={3}>
      // Grid para alinear los elementos del formulario
      <Grid container spacing={2} alignItems="center">
        // Campo de texto para la búsqueda
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            fullWidth
            id="query"
            name="query"
            label="Buscar libro (título, autor o ISBN)"
            value={formik.values.query}
            onChange={formik.handleChange}
            error={formik.touched.query && Boolean(formik.errors.query)}
            helperText={formik.touched.query && formik.errors.query}
          />
        </Grid>
        // Selector de tipo de búsqueda
        <Grid item xs={4} sm={2} md={2}>
          <TextField
            select
            id="type"
            name="type"
            label="Tipo"
            value={formik.values.type}
            onChange={formik.handleChange}
            SelectProps={{ native: true }}
          >
            <option value="intitle">Título</option>
            <option value="inauthor">Autor</option>
            <option value="isbn">ISBN</option>
          </TextField>
        </Grid>
        // Botón para enviar el formulario
        <Grid item xs={12} sm={2} md={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
