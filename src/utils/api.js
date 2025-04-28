// Funciones utilitarias para interactuar con la Google Books API
// Incluye la función principal de búsqueda de libros

import axios from 'axios';

// Realiza una búsqueda de libros en la Google Books API
// Parámetros: query (texto), type (intitle, inauthor, isbn), sort, page
// Devuelve un objeto con los libros y el total de resultados
export async function searchBooksApi({ query, type, sort = 'relevance', page = 1 }) {
  // Calcula el índice de inicio para la paginación
  const startIndex = (page - 1) * 12;
  
  // Construye la URL de la petición a la API
  const url = `https://www.googleapis.com/books/v1/volumes?q=${type}:${encodeURIComponent(query)}&orderBy=${sort}&startIndex=${startIndex}&maxResults=12`;
  
  // Realiza la petición GET a la API
  const res = await axios.get(url);
  
  // Extrae los resultados de la respuesta
  const items = res.data.items || [];
  
  // Mapea los resultados a objetos de libro
  const books = items.map(item => {
    const info = item.volumeInfo;
    return {
      id: item.id,
      title: info.title,
      authors: info.authors,
      thumbnail: info.imageLinks?.thumbnail,
      categories: info.categories,
    };
  });
  
  // Devuelve los libros y el total de resultados
  return { books, totalItems: res.data.totalItems || 0 };
}
