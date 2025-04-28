// Contexto global para la gestión de libros, filtros y paginación
// Proporciona funciones para buscar libros, filtrar, ordenar y paginar resultados

import React, { createContext, useContext, useState, useMemo } from 'react';
import { searchBooksApi } from '../utils/api';

const BooksContext = createContext();

/**
 * Proveedor del contexto de libros
 * 
 * @param {Object} props 
 * @param {React.ReactNode} props.children 
 */
export function BooksProvider({ children }) {
  // Estado para almacenar los libros
  const [books, setBooks] = useState([]);
  
  // Estado para almacenar las categorías de libros
  const [categories, setCategories] = useState([]);
  
  // Estado para almacenar el orden de los libros
  const [sort, setSort] = useState('relevance');
  
  // Estado para almacenar la categoría de filtro
  const [filterCategory, setFilterCategory] = useState('');
  
  // Estado para indicar si se está cargando
  const [loading, setLoading] = useState(false);
  
  // Estado para almacenar el error
  const [error, setError] = useState(null);
  
  // Estado para almacenar la página actual
  const [page, setPage] = useState(1);
  
  // Estado para almacenar el total de páginas
  const [totalPages, setTotalPages] = useState(1);
  
  // Estado para almacenar la última consulta
  const [lastQuery, setLastQuery] = useState(null);

  /**
   * Función para buscar libros usando la API
   * 
   * @param {Object} params 
   * @param {string} params.query 
   * @param {string} params.type 
   */
  const searchBooks = async ({ query, type }) => {
    setLoading(true);
    setError(null);
    setPage(1);
    setLastQuery({ query, type });
    try {
      const { books: results, totalItems } = await searchBooksApi({ query, type, sort, page: 1 });
      setBooks(results);
      setTotalPages(Math.ceil(totalItems / 12));
      const cats = Array.from(new Set(results.flatMap(b => b.categories || [])));
      setCategories(cats);
    } catch (err) {
      setError('Error al buscar libros');
      setBooks([]);
      setCategories([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  /**
   * Actualiza los libros cuando cambian filtros, orden o página
   */
  React.useEffect(() => {
    if (!lastQuery) return;
    setLoading(true);
    searchBooksApi({ ...lastQuery, sort, page }).then(({ books: results, totalItems }) => {
      let filtered = results;
      if (filterCategory) {
        filtered = filtered.filter(b => b.categories?.includes(filterCategory));
      }
      setBooks(filtered);
      setTotalPages(Math.ceil(totalItems / 12));
      const cats = Array.from(new Set(results.flatMap(b => b.categories || [])));
      setCategories(cats);
      setLoading(false);
    }).catch(() => {
      setError('Error al buscar libros');
      setBooks([]);
      setCategories([]);
      setTotalPages(1);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [sort, page, filterCategory]);

  /**
   * Valor del contexto
   */
  const value = useMemo(() => ({
    books,
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
  }), [books, categories, sort, filterCategory, loading, error, page, totalPages]);

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}

/**
 * Hook personalizado para usar el contexto de libros
 */
export function useBooks() {
  return useContext(BooksContext);
}
