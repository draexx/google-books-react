// Global context for managing books, filters, and pagination.
// Provides functions to search, filter, sort, and paginate book results.

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { searchBooksApi } from '../utils/api';

const BooksContext = createContext();

/**
 * Provider for the books context.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function BooksProvider({ children }) {
  // State for the raw list of books fetched from the API
  const [allBooks, setAllBooks] = useState([]);
  // State for the books that are displayed after filtering
  const [filteredBooks, setFilteredBooks] = useState([]);
  // State for book categories
  const [categories, setCategories] = useState([]);
  // State for sorting order
  const [sort, setSort] = useState('relevance');
  // State for the selected filter category
  const [filterCategory, setFilterCategory] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);
  // State for the current page
  const [page, setPage] = useState(1);
  // State for the total number of pages
  const [totalPages, setTotalPages] = useState(1);
  // State for the last search query
  const [lastQuery, setLastQuery] = useState(null);

  /**
   * Triggers a new book search by updating the query parameters.
   * The actual fetching is handled by a useEffect hook.
   * @param {object} params
   * @param {string} params.query
   * @param {string} params.type
   */
  const searchBooks = ({ query, type }) => {
    setPage(1);
    setFilterCategory('');
    setLastQuery({ query, type });
  };

  // Effect to fetch books when the query, page, or sort order changes.
  useEffect(() => {
    if (!lastQuery) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const { books: results, totalItems } = await searchBooksApi({ ...lastQuery, sort, page });
        setAllBooks(results);
        // Set categories from the first page of a new search.
        if (page === 1) {
          const cats = Array.from(new Set(results.flatMap(b => b.categories || []).filter(Boolean)));
          setCategories(cats);
        }
        setTotalPages(Math.ceil(totalItems / 12));
      } catch (err) {
        setError('Error searching for books');
        setAllBooks([]);
        setCategories([]);
        setTotalPages(1);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [lastQuery, page, sort]);

  // Effect to filter books on the client side when the category filter changes.
  useEffect(() => {
    if (filterCategory) {
      const filtered = allBooks.filter(book => book.categories?.includes(filterCategory));
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(allBooks);
    }
  }, [filterCategory, allBooks]);

  // Memoized context value to prevent unnecessary re-renders.
  const value = useMemo(() => ({
    books: filteredBooks,
    categories,
    sort,
    setSort,
    filterCategory,
    setFilterCategory,
    loading,
    error,
    page,
    setPage,
    totalPages,
    searchBooks,
  }), [filteredBooks, categories, sort, filterCategory, loading, error, page, totalPages]);

  return <BooksContext.Provider value={value}>{children}</Books.Context.Provider>;
}

/**
 * Custom hook to use the books context.
 */
export function useBooks() {
  return useContext(BooksContext);
}
