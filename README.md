# Google Books React App

Aplicación web desarrollada en React que permite buscar libros usando la Google Books API, aplicar filtros, ver detalles y gestionar una lista de deseos persistente.

---

## Características principales

- **Búsqueda avanzada**: por título, autor o ISBN.
- **Resultados en tiempo real**: muestra portada, título y autor.
- **Detalles completos**: descripción, páginas, categorías, enlaces de compra.
- **Filtros y ordenamiento**: por relevancia, novedad y categoría.
- **Lista de deseos**: persistente en localStorage.
- **Paginación avanzada**.
- **Validación de formularios** con Formik y Yup.
- **Gestión de estados complejos** con Context API.
- **Optimización de renderizado** con React.memo y hooks.

---

## Estructura del proyecto

```
/src
  components/           # Componentes de UI reutilizables
    SearchForm.jsx      # Formulario de búsqueda y validación
    BookList.jsx        # Lista de resultados y paginación
    BookItem.jsx        # Tarjeta de libro individual
    BookDetails.jsx     # Vista de detalles de un libro
    Filters.jsx         # Filtros y ordenamiento
    Wishlist.jsx        # Lista de deseos del usuario
  contexts/             # Contextos globales de estado
    WishlistContext.jsx # Contexto y provider para la lista de deseos
    BooksContext.jsx    # Contexto y provider para libros, filtros y paginación
  utils/                # Utilidades y helpers
    api.js              # Funciones para consultar la Google Books API
    validation.js       # Validaciones personalizadas
  App.jsx               # Componente principal y rutas
  main.jsx              # Punto de entrada de la app
```

---

## Instalación y uso rápido

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Explicación de los principales archivos y componentes

- **main.jsx**: Punto de entrada. Renderiza el componente principal y configura el enrutamiento.
- **App.jsx**: Define la estructura general, los contextos y las rutas principales.
- **contexts/BooksContext.jsx**: Maneja la búsqueda, filtros, paginación y estado global de los libros.
- **contexts/WishlistContext.jsx**: Gestiona la lista de deseos y su persistencia en localStorage.
- **components/SearchForm.jsx**: Formulario avanzado de búsqueda con validación.
- **components/BookList.jsx**: Muestra los resultados, permite paginar y aplicar filtros.
- **components/BookItem.jsx**: Tarjeta de libro, permite ver detalles y agregar a deseos.
- **components/BookDetails.jsx**: Vista de detalles ampliados de un libro.
- **components/Filters.jsx**: Permite filtrar y ordenar los resultados.
- **components/Wishlist.jsx**: Visualiza y permite eliminar libros de la lista de deseos.
- **utils/api.js**: Función para consultar la Google Books API y mapear resultados.

---

## Ejemplos de uso

A continuación se muestran ejemplos visuales del funcionamiento de la aplicación:

### 1. Búsqueda de libros

![Ejemplo de búsqueda](docs/example-search.png)

### 2. Lista de resultados y filtros

![Resultados y filtros](docs/example-results.png)

### 3. Detalles de un libro

![Detalles del libro](docs/example-details.png)

### 4. Lista de deseos

![Lista de deseos](docs/example-wishlist.png)

---

## Ejemplos de código

A continuación se muestran ejemplos de uso de los contextos y componentes principales del proyecto:

### Uso del contexto de libros (BooksContext)

```jsx
import { useBooks } from './contexts/BooksContext';

function BuscarLibro() {
  const { searchBooks, books, loading } = useBooks();
  
  // Ejemplo de búsqueda por título
  const handleBuscar = () => {
    searchBooks({ query: 'React', type: 'intitle' });
  };

  return (
    <div>
      <button onClick={handleBuscar}>Buscar "React"</button>
      {loading && <span>Cargando...</span>}
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Uso del contexto de lista de deseos (WishlistContext)

```jsx
import { useWishlist } from './contexts/WishlistContext';

function Deseos() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Ejemplo: agregar un libro
  const libro = { id: '123', title: 'Mi Libro', authors: ['Autor'] };
  return (
    <div>
      <button onClick={() => addToWishlist(libro)} disabled={isInWishlist(libro.id)}>
        {isInWishlist(libro.id) ? 'En lista de deseos' : 'Agregar a deseos'}
      </button>
      <ul>
        {wishlist.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => removeFromWishlist(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Ejemplo de integración de componentes

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

## Personalización y mejoras

- Puedes agregar autenticación para que la lista de deseos sea multiusuario (requiere backend).
- Puedes cambiar el diseño usando otros frameworks de UI como Chakra UI, Bootstrap, etc.
- Puedes agregar tests con Jest y React Testing Library.
- Puedes desplegar la app fácilmente en Vercel, Netlify, etc.

---

## Licencia

MIT

---

¿Dudas o sugerencias? ¡Contribuye o abre un issue!
