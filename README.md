# Google Books React App

A web application developed in React that allows users to search for books using the Google Books API, apply filters, view details, and manage a persistent wishlist.

---

## Key Features

- **Advanced Search**: by title, author, or ISBN.
- **Real-time Results**: displays cover, title, and author.
- **Full Details**: description, page count, categories, purchase links.
- **Filtering and Sorting**: by relevance, newest, and category.
- **Persistent Wishlist**: saved in localStorage.
- **Advanced Pagination**.
- **Form Validation** with Formik and Yup.
- **Complex State Management** with Context API.
- **Render Optimization** with React.memo and hooks.

---

## Project Structure

```
/src
  components/           # Reusable UI components
    SearchForm.jsx      # Search form and validation
    BookList.jsx        # Results list and pagination
    BookItem.jsx        # Individual book card
    BookDetails.jsx     # Detailed view of a book
    Filters.jsx         # Filters and sorting
    Wishlist.jsx        # User's wishlist
  contexts/             # Global state contexts
    WishlistContext.jsx # Context and provider for the wishlist
    BooksContext.jsx    # Context and provider for books, filters, and pagination
  utils/                # Utilities and helpers
    api.js              # Functions to query the Google Books API
    validation.js       # Custom validations
  App.jsx               # Main component and routes
  main.jsx              # App entry point
```

---

## Quick Start

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Main Files and Components Explained

- **main.jsx**: Entry point. Renders the main component and sets up routing.
- **App.jsx**: Defines the general structure, contexts, and main routes.
- **contexts/BooksContext.jsx**: Manages search, filters, pagination, and the global state of books.
- **contexts/WishlistContext.jsx**: Manages the wishlist and its persistence in localStorage.
- **components/SearchForm.jsx**: Advanced search form with validation.
- **components/BookList.jsx**: Displays results, allows pagination and filtering.
- **components/BookItem.jsx**: Book card, allows viewing details and adding to the wishlist.
- **components/BookDetails.jsx**: Expanded details view of a book.
- **components/Filters.jsx**: Allows filtering and sorting of results.
- **components/Wishlist.jsx**: Displays and allows removing books from the wishlist.
- **utils/api.js**: Function to query the Google Books API and map results.

---

## Usage Examples

Below are visual examples of the application's functionality:

### 1. Book Search

![Search Example](docs/example-search.png)

### 2. Results List and Filters

![Results and Filters](docs/example-results.png)

### 3. Book Details

![Book Details](docs/example-details.png)

### 4. Wishlist

![Wishlist](docs/example-wishlist.png)

---

## Code Examples

Here are some examples of how to use the main contexts and components of the project:

### Using the BooksContext

```jsx
import { useBooks } from './contexts/BooksContext';

function SearchForBook() {
  const { searchBooks, books, loading } = useBooks();
  
  // Example: search by title
  const handleSearch = () => {
    searchBooks({ query: 'React', type: 'intitle' });
  };

  return (
    <div>
      <button onClick={handleSearch}>Search for "React"</button>
      {loading && <span>Loading...</span>}
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Using the WishlistContext

```jsx
import { useWishlist } from './contexts/WishlistContext';

function Wishlist() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Example: add a book
  const book = { id: '123', title: 'My Book', authors: ['Author'] };
  return (
    <div>
      <button onClick={() => addToWishlist(book)} disabled={isInWishlist(book.id)}>
        {isInWishlist(book.id) ? 'In Wishlist' : 'Add to Wishlist'}
      </button>
      <ul>
        {wishlist.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => removeFromWishlist(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Component Integration Example

```jsx
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import Wishlist from './components/Wishlist';

function HomePage() {
  return (
    <>
      <SearchForm />
      <BookList />
      <Wishlist />
    </>
  );
}
```

---

## Customization and Improvements

- You can add authentication for multi-user wishlists (requires a backend).
- You can change the design using other UI frameworks like Chakra UI, Bootstrap, etc.
- You can add tests with Jest and React Testing Library.
- You can easily deploy the app to Vercel, Netlify, etc.

## Proposed Improvements

The following improvements have been made to the codebase:

- **Optimized `BooksContext.jsx`**: The logic for filtering books by category has been moved to the client side to avoid unnecessary API calls, improving performance. The data fetching logic in the `useEffect` hook has been made more robust and reliable.
- **Translated Code Comments**: All code comments have been translated from Spanish to English to improve code readability and maintainability for a wider audience.
- **Updated `README.md`**: This `README.md` has been translated to English, and the image links have been fixed.

---

## License

MIT

---

Questions or suggestions? Contribute or open an issue!
