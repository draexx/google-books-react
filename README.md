# Google Books React App

Este proyecto es una aplicación React que consume la Google Books API para buscar, filtrar y guardar libros en una lista de deseos.

## Características
- Búsqueda por título, autor o ISBN
- Lista de resultados con título, autor y portada
- Detalles de cada libro (descripción, páginas, categorías, enlaces de compra)
- Filtros y ordenamiento
- Lista de deseos persistente (localStorage)
- Paginación avanzada
- Validación avanzada de formularios
- Gestión de estados complejos con Context API
- Optimización de renderizado

## Estructura sugerida

```
/src
  components/
    SearchForm.jsx
    BookList.jsx
    BookItem.jsx
    BookDetails.jsx
    Filters.jsx
    Wishlist.jsx
  contexts/
    WishlistContext.jsx
    BooksContext.jsx
  utils/
    api.js
    validation.js
  App.jsx
  index.js
```

## Primeros pasos

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

¿Listo para comenzar? Si quieres que te ayude con la implementación de algún componente o funcionalidad, ¡avísame!
