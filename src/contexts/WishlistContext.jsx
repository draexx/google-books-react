// Contexto para la gestión global de la lista de deseos
// Proporciona funciones para agregar, eliminar y consultar libros en la lista de deseos
// Persiste la lista en localStorage

import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Cargar la lista de deseos desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // Guardar la lista de deseos en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Agregar libro a la lista de deseos
  const addToWishlist = (book) => {
    if (!wishlist.find((b) => b.id === book.id)) {
      setWishlist([...wishlist, book]);
    }
  };
  // Eliminar libro de la lista de deseos
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((b) => b.id !== id));
  };
  // Verificar si un libro está en la lista de deseos
  const isInWishlist = (id) => wishlist.some((b) => b.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Hook personalizado para usar el contexto de lista de deseos
export function useWishlist() {
  return useContext(WishlistContext);
}
