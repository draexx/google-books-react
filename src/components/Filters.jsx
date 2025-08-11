// Component for filtering and sorting the book list.
// Allows selecting the category and order of the results.

import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useBooks } from '../contexts/BooksContext';

/**
 * Filters component that allows the user to select the order and category of the books.
 * Uses the books context to get and update the sort and category values.
 */
export default function Filters() {
  // Get sort and category values and functions to update them from the books context.
  const { sort, setSort, categories, filterCategory, setFilterCategory } = useBooks();

  return (
    // Flex container to align the sort and category selectors.
    <Box display="flex" gap={2} mb={2}>
      {/* Sort selector. */}
      <FormControl size="small">
        <InputLabel>Sort</InputLabel>
        <Select value={sort} label="Sort" onChange={e => setSort(e.target.value)}>
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>
      {/* Category selector. */}
      <FormControl size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={filterCategory}
          label="Category"
          onChange={e => setFilterCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
