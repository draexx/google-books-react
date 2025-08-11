// Utility functions for interacting with the Google Books API.
// Includes the main function for searching books.

import axios from 'axios';

// Performs a book search on the Google Books API.
// Parameters: query (text), type (intitle, inauthor, isbn), sort, page.
// Returns an object with the books and the total number of results.
export async function searchBooksApi({ query, type, sort = 'relevance', page = 1 }) {
  // Calculate the start index for pagination.
  const startIndex = (page - 1) * 12;

  // Build the API request URL.
  const url = `https://www.googleapis.com/books/v1/volumes?q=${type}:${encodeURIComponent(query)}&orderBy=${sort}&startIndex=${startIndex}&maxResults=12`;

  // Make the GET request to the API.
  const res = await axios.get(url);

  // Extract the results from the response.
  const items = res.data.items || [];

  // Map the results to book objects.
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

  // Return the books and the total number of results.
  return { books, totalItems: res.data.totalItems || 0 };
}
