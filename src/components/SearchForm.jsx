// Book search form component.
// Allows searching by title, author, or ISBN using the Google Books API.
// Uses Formik and Yup for form handling and validation.

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Grid } from '@mui/material';
import { useBooks } from '../contexts/BooksContext';

// Validation schema for the form.
// Requires a text field for the search query and a selector for the search type.
const validationSchema = yup.object({
  query: yup.string().required('Field is required'),
  type: yup.string().oneOf(['intitle', 'inauthor', 'isbn']).required(),
});

// Main component function.
// Uses the useFormik hook to manage the form state
// and the useBooks hook to access the books context.
export default function SearchForm() {
  const { searchBooks } = useBooks();
  const formik = useFormik({
    // Initial form values.
    initialValues: { query: '', type: 'intitle' },
    // Validation schema.
    validationSchema,
    // Form submission function.
    onSubmit: (values) => {
      searchBooks(values);
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit} mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8} sm={8} md={8}>
          <TextField
            fullWidth
            id="query"
            name="query"
            label="Search for a book (title, author, or ISBN)"
            value={formik.values.query}
            onChange={formik.handleChange}
            error={formik.touched.query && Boolean(formik.errors.query)}
            helperText={formik.touched.query && formik.errors.query}
          />
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <TextField
            select
            id="type"
            name="type"
            label="Type"
            value={formik.values.type}
            onChange={formik.handleChange}
            SelectProps={{ native: true }}
          >
            <option value="intitle">Title</option>
            <option value="inauthor">Author</option>
            <option value="isbn">ISBN</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
